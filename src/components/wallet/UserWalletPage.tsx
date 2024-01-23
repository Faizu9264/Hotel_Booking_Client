import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import api from "../../services/userApi";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  setWalletBalance,
  setWalletHistory,
} from "../../redux/slices/walletSlice";
import "./UserWalletPage.css";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

export interface WalletTransaction {
  amount: number;
  paymentMethod: string;
  date: Date;
}

const UserWalletPage: React.FC = () => {
  const [showWalletHistory, setShowWalletHistory] = useState(true);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const walletBalance = useSelector(
    (state: RootState) => state.wallet.walletBalance
  );
  const walletHistory = useSelector(
    (state: RootState) => state.wallet.walletHistory
  );

  const transactionsPerPage = 5;

  const fetchDataAsync = async () => {
    try {
      if (userData?.userId) {
        const response = await api.getWalletByUserId(dispatch, userData.userId);

        if (response) {
          const { walletAmount, walletTransactions } = response;
          if (walletAmount !== undefined && walletTransactions !== undefined) {
            const sortedTransactions = walletTransactions.sort(
              (a: WalletTransaction, b: WalletTransaction) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            dispatch(setWalletBalance({ walletBalance: walletAmount }));
            dispatch(setWalletHistory({ walletHistory: sortedTransactions }));
          } else {
            console.error(
              "Error: walletAmount or walletTransactions are undefined in response data:",
              response.data
            );
          }
        } else {
          console.error("Error: Unexpected response structure:", response);
        }
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const debouncedFetchData = debounce(fetchDataAsync, 500);

  useEffect(() => {
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [userData?.userId]);

  const handleAddToWallet = async () => {
    try {
      const { value: amountToAdd } = await Swal.fire({
        title: "Enter Amount",
        input: "number",
        inputLabel: "Amount",
        inputPlaceholder: "Enter the amount",
        showCancelButton: true,
        inputValidator: (value) => {
          const numericValue = Number(value);
          if (!numericValue || numericValue <= 0) {
            return "Please enter a valid amount.";
          }
          return null;
        },
      });

      if (amountToAdd) {
        await api.AddMoney(userData?.userId, {
          amount: parseInt(amountToAdd),
          paymentMethod: "Deposited via Stripe",
        });

        debouncedFetchData();

        toast.success("Payment successful!");
      } else {
        toast.error("Payment canceled or failed. Please try again.");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const toggleWalletHistory = () => {
    setShowWalletHistory(!showWalletHistory);
  };
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (walletHistory) {
      setCurrentPage(newPage + 1);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Paper
        elevation={3}
        className="user-wallet-container p-8"
        sx={{ backgroundColor: "#E0F7FA", marginTop: "20px" }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          My Wallet
        </Typography>
        <div className="wallet-buttons">
          <div>
            <img
              src="/logo/wallet.png"
              alt="Wallet Logo"
              className="wallet-logo"
            />
          </div>

          <div className="count-card hover:shadow-lg transition-transform transform hover:scale-105 bg-blue-200 p-6 rounded-md text-center flex items-center">
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mb-2">Balance:</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-800">
                ₹{walletBalance ? walletBalance : 0}
              </div>
            </div>
          </div>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={handleAddToWallet}
            className="custom-outlined-button"
          >
            Add to Wallet
          </Button>
        </div>

        <Typography variant="h6" gutterBottom>
          Wallet History
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleWalletHistory}
          className="wallet-history-toggle"
        >
          {showWalletHistory ? "Hide Wallet History" : "Show Wallet History"}
        </Button>
        {showWalletHistory && walletHistory && walletHistory.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#f2f2f2",
                      color: "#333",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#f2f2f2",
                      color: "#333",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#f2f2f2",
                      color: "#333",
                    }}
                  >
                    Payment Method
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {walletHistory
                  .slice(
                    (currentPage - 1) * transactionsPerPage,
                    currentPage * transactionsPerPage
                  )
                  .map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {transaction.amount > 0
                          ? `+₹${Math.abs(transaction.amount)}`
                          : `-₹${Math.abs(transaction.amount)}`}
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={walletHistory ? walletHistory.length : 0}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              rowsPerPage={transactionsPerPage}
              rowsPerPageOptions={[transactionsPerPage]}
            />
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default UserWalletPage;
