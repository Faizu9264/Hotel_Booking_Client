import React from 'react'

const Login = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
    <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-6">
                <div className="text-center pb-8">
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Log in to your account</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-5"
                >
      <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
          </div>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-x-3">
                    <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                    <label
                        htmlFor="remember-me-checkbox"
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    >
                    </label>
                    <span>Remember me</span>
                </div>
                <a href="javascript:void(0)" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            <button
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
            >
                Sign in
            </button>
        </form>
        <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <img src={'/logo/googleLogo.png'} alt="Logo" style={{ width:"40px", height:"40px"}} />
              Sign In with Google
            </button>
        <p className="text-center">Don't have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
    </div>
</main>
  )
}

export default Login
