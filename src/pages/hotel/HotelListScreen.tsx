import { Avatar, Button, Card, Container, ImageList, ImageListItem, ImageListItemBar, Rating, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { LocationOnOutlined, Pin, StarBorder } from '@mui/icons-material';
import { RootState } from '../../redux/store';

const HotelListScreen: React.FC = () => {
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  console.log('hotelListScreen',hotels)
  return (
    <Container sx={{p:5}}>
      <ImageList gap={12} sx={{ mb: 8 ,gridTemplateColumns:'repeat(auto-fill,minmax(280px, 1fr)) !important'}}>
        {hotels.map((hotel) => (
              <Tooltip title='Click to check room availability!'>
          <Card key={hotel._id} sx={{width:'100%',height:'270px'}}>
            <ImageListItem sx={{ height: '100% !important' }}>
              
              <ImageListItemBar
              
                sx={{
                  background: '0',
                }}
                title={hotel.details.hotelName}
                subtitle={`𖡡 ${hotel.details.location}`}
                actionIcon={
                    <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACUCAMAAAB1LD/SAAAAZlBMVEX///8AAADs7OxtbW2enp719fVCQkKGhobKysr6+vrg4OCsrKzw8PCWlpZgYGDm5ubZ2dm8vLykpKQsLCwzMzPR0dFVVVWOjo4jIyPCwsI7OzsbGxtnZ2e1tbV2dnZKSkp+fn4MDAwNx2CkAAAMMUlEQVR4nNWd67qqIBCG85Sallpp2VHv/yZ3nhVmONtqf7/2s1cKr8AwwACbDV+hNxP318/suRN4qbI8QkIP5cKZiu0gyPfbSWc3D1Lbxp+wLcvai71cVradfnJT3LZzncomP4wMNfI+mTon3ARCLzi+HIvWzXGi5y6En3I/P3AVcDh5SZ5Z5Dg3IDeWdX04r6xkQZfNr3iFvCur1xlMoFPxysBXvM0Th/n+dbBqRmY+uj8uZYC94cAn9o63EzsFyzptnSwmH2wqtVni5PJmffl5hs5FBFbd9MYl3gumYZ184knfMHHg1IJZ6XUAXnKx2MTe8y6TxDtKp2e7Rw0R22UlidvqnBFNOrLYxGklm8TVzZLWjoVBYRkjjsuDAm6rIspnnVbybv/zhBGXW5U0Dv7RdY+Xvu0bII6fLySp8/YSzXU5bWmTc65GK5b3L8LK2Ida8PmD02svwq9P7B7glvU4uulu6XSE6S4/utQvT37e/jkbgSLwy9Ld79aJ5n5NGHuZ816ZOIUTKILY28BuQBgnLvnQ9dZo+nKQX1TWxEP1uQQTiP0ty7rpEcdQPbre9lw3Mb3BHgpOXBIU98MR9VrD7IUzaxHnBfDGCnUuFrL3jJKgiSlg2r+YK8wcKG+axKFLl9PdAZsgqPSJNjmamEjqDlfomeIU6T/UiUvAQlcBZ5yw1I62Ygixv/z7K4VeRyi5mCXOAdcWb1mIwgAuZoI4JPwOHxkakcqg7luROHzQr3oL5mMhG+xDl7nyyBIWf/37aog4pLvGU8U0JbgiyMQsPl6w/NtZYhbDiyhbo0Rs097t9qnyou5tQH1ZEC//fhXrC3qFKfl2FeKYBnZETAmmhLaqc+Ld8k8X2dzqE++qmsqhDvAnU1TFnhF7SxP5kOoNGj11iQOa18qk37JUSBr+GfGyj6kVkir1iIk61orrDvBF9FITcbzsYRzpIv58z8VHkyX2aCt91S3h9r3Lij0Ru8sqdVR5+W5uKCSJbaJrbIDVrfRc6WLsO5ZkuPTszlKGelQy+55yxDENbFVKeaAUHufOwuh0lUsX4qDa6asS57QLc1PxtCDZ86bsAFltRM5OCmty7aSIU7qETVitXvbMYA+OJNlVKxN7SsQQsJIlQTQbSQ3EKTGzpUy8Ge2BDDFdpa2Cv0IkocmXG4gJl7pW/8C7YUpBghgYzF7N1elFrkbipfNg1eLzDZSG7IsT58DU6UPRdGI6EsQeOcBVr9VjAxEmjoEpj7vGJ2fmag3iAUCYmOgmuiJWTx/W5A92Y2CTxAOBKDEworMsNQeIpXwYwCPEBwW3enz3VooYcLast3rqqAb70hOT02BvjSiOfkggSJwBwFaunjqqoSV3ZAGVpo7liGRWU6HJdGj5V1/OnDih0j1oOADlSZz4SSbcyHwrbhQvajU9/aoxNLW3wsQeNN0oEJCjpD2bWKeQHWFiMBJhb2rQRKgNT+ltBEBsPWSXASYFosQ2VMSGHcxJYZta1f47hmJ61GcgElHiAFqa3+pNXzLUVuui+zfUR9yVkUWjm0JwxUp22lhcu/NETHdPWsiVGDEw8WGZHRgv1Ya/sIjVkR0h4hBc8iwMj5rmyibiHCS2zorIeyHiHRgiV61kqRs1dqMnhtakGp18JYudCBGXYJLmI1gnNZg9MThka6U0bgstEQMEhqjcV7PUjT7Dlm3/zxyNkNGZD2HKA5M7rZQaLUZYYqQxdGQIrla3VdIC02fEZhWruPZwxMyazXgpaog819U1X8wJ2BkbnJfnCtoaMOlhfJB+rKF0TurevLSg5du5TBswYjGz1/ea8QbrHmdKTPoGO7gVrTHDhYsXRHy9GByqg8OmtaY/MIHzqAsVkbFmhnzeVf0PWlnNQ7YemaGqjQROfpkYnDsmdFeNoFtqh4TsfpsYy8dC14sBZixCfsWhIiw64gtUoJ0xhLj6YnfcKxFDdkrNrGWwx/X6PvEyQgnX9fXUyRw8/fE3xFh9o5kPOrlDxuPOXxCLVuyPD6xuwjCX9ovjiEV2RJEt66johWHE33W5JtkObFegck6VyvnXiGeBInxVmULb+z3iMBDfE3q9yC+v/x7xxxcR3W/dbPOTXjj5RWKhccWok+RyMxgL8efEG9vnHiMwqZKaFsL2Ff8x8WZTIksVoJ4SPRU2SPtz4k2M7f+DdBCv2r9LjO7/A3V6iU7y/jBxc2qEuNW2boKLkT9N/BlbOBIWbC9UzD9OvNnkElX7HQjMhP088WYXiTNfj3xX+/eJP1VbYNZvQC64NRtbyfwl4k2YsFem5nrzShmJwvgt4o+ezIMn5tpyvJHf9KsB2XvRyYKCPZ76b4ibA2EEJwvYyP8R8SYufTFm5oal/4n4Y8IiMWTWCQ//F/FGdFKIscaOEa8Xoair8FLziRkHxoBhxtZfzVcLKXy++M42Y6M6Ukv+ZE1CVGHJH1Oh0fDYKswfrLTJKD3yPBL0WLvNswYf4Punf6yA55CgWw9S5CS/b6+YyyuFy2oUNkOAref9PvEm9pnMDvbcj8SBqMh7Mqs29hgS6/O9sEwdoQeeNcKqdQl3bt8LNtYTGo+O+5pIzN791431IBz5hLRMG1nK+9aaeWgniVYIYoS6I9hJbkhTMHOyDV/tF9fydxJswQbbvI34IHedTEjIdtQOqJoJCx95Yx0OPOa8fsnPbIk1KxS8SwzfWQL3T6ttRCHUEGsdl9AIMV/YpQPwz79KXGhWqBAuNfSaBbhav1fab02oI9aNtoSdZdSNQoL2vzMP0hLrH/IG2l80PNn+y2hUW3wjPPM1kL0+YfESSCvgTHUbUkescpzgUhADSgweF6nfZ4ipI9b/ulBMFE5MHrQ7FPI3fOuO2MCeJmA1DidGdnmtO0jeue0Cd0+sbyaB8+OuODHip+k6Biw1x2L49kisc4BRLzr/rPNkI7CQ6xWrdXNYw2sirvVXQej8sy56iuEOar3jIpp58nYA2xMbaMi078i82goeM2oOahi5a+pU2+EPxJb2/i36aCL2ZV5wfMRK2xfbTSBO6xGNxNr9kywxeW5lX8iruJpxe6lVV39GYm0zSRHzzuuFw3AN2FBabWdYdf8eibe61Zoi5h31Ce8Pvfvmd7d1vX/f2Y/E2l0yRcy9sSCAV6+Mb2rvesLBJk7Eb82RC0nMPymHvMVikGHPqzsoYTwweSLWPZuTPI5JpJnAE7mVXkYIdbPF0xTARKxrM1TyTV2w1En6ahSGumN8ZjdGzIj1Dn2zyWwLeXFIBKS54+e6W7qux+mFc2KtU99Il0tsHQm4OaPR3TVVyt2IZT6RNye2Co1PSw6GBEf3wE1prQwtNfaGYt7hLYjHA53kRU50Ce9fxWIGTNw3228jvy8KckmsHHITE1YXW2YDhGzBNoA8nD22fBNB3I6ZFUROc8mYngw5SkkgPp2pHu1O5IUktpScPHJNGF1yAoWt4ugdKZT1I3/y41PEtULFDsmdapLDEuyYnVslnZVRQwwpVdsoYsbEOiryHWjUCyaklD+fTtGuJEMZ0NYAIJb15akL1qSBqZtLZjra8l1mmPWtrAYqG0h8PUq0Q8qJUOriMPNlWWdXsjmH6WBHa8jeg8TNHWmi1WlHhnXd1OxNiZ/3d45kJmiCy9jD7yEIhNg6OWJzbOWWAEbuWuUrdvEA10L4uKxdNb7lFIClhhE3l6ELVG1qTfGuMRmJ7cZuP2TBvtW01S56z4LFEM8CJ7aafXms09dCm15LOetNYGD7sfvsZIHnIRnywnQxJYFHHDCJm9uiy50HVQ4vDCp60ualOyP64tyx/Thc0jzxFgrTPD8elhwHfKzKIf5oW12CYFl0aZldgBOobxf9YW3u8u8VL/yFLnTY44XRIAfis/PRC+kVz6dtNU/jfYJ+eBbZm8pXIL5nENGrZGWkJ97mcaM0d++1Yjq+qRX+mBe6zeHN2SaOXjFPSuFNijPdTa4ljD6TvN5c09kSk4bNcy+FxO7yj6EwHs9g77fCRwwNqm8vgbXJlvhNd11xUB0EoW+Fu8bp4snTkYGuty8x35gRs5eUR37lqs9+sFbkWZxnruh27yJKBT97G5eJ9tZJmlUM6mvlp+m6QVheHvk8u1L5USr+1Zu5IGaAQOjZ6fvw0YL8XhyKfRyHKx6WP+UgTuzELw60210Xh0dg2zK5+AebUJSLI7xR4AAAAABJRU5ErkJggg==' sx={{ m: '10px'}} />
                }
                position='top'
                />
              <img src={hotel.images[0]} alt={hotel.details.hotelName} style={{cursor:'pointer'}} loading='lazy' />
              {/* Want to give room starts from with  */}
              <ImageListItemBar
                title={`₹${hotel.details.minRent}`}
                subtitle={'Rooms starts from'}
                actionIcon={
                  <Rating
                  sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name='hotelRating'
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={<StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />}
                  />
                }
                />
               
            </ImageListItem>
          </Card>
                </Tooltip>
        ))}
      </ImageList>
    </Container>
  );
};

export default HotelListScreen;