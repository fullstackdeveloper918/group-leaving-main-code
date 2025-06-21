import React from 'react'
import Table from './common/Table'
// import Table from './common/table'

const AccountContribution = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Gift Card Balance Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Gift Card Balance</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          This is your gift card balance which hasn’t been assigned to any gift cards yet.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg mx-auto max-w-sm text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <select className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
            <span className="text-3xl font-semibold">₹0.00</span>
          <div className="flex justify-center mt-4 mb-2">
            <button className="text-blue-600 text-black  hover:underline">Transaction History</button>
            <button className="px-4 py-2 bg-blue-600 text-black border-2 rounded-lg hover:bg-blue-700">Top Up</button>
          </div>
        </div>
      </div>

      {/* Gift Card Contributions Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Gift Card Contributions</h2>
        <div className="bg-blue-50 p-4 rounded-lg text-blue-600 flex items-start">
          <span className="mr-2">ℹ️</span>
          <p className="text-sm">
            You will only be able to see the contributions you made while you were signed in to your account.
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Looks like you haven’t contributed to any Shared Gift Funds yet.
        </p>
      </div>

      {/* Signed Cards Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Signed Cards</h2>
       <Table />
      </div>
    </div>
  )
}

export default AccountContribution