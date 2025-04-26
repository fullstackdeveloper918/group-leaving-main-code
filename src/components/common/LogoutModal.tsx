import React from 'react'

const LogoutModal = ({ isOpen, onClose, onConfirm }:any) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Are you sure you want to logout?</h2>
        <div className="flex justify-end mt-4">
            <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                Cancel
            </button>
            <button className="px-4 py-2 bg-red-500 text-black rounded" onClick={onConfirm}>
                Yes
            </button>
        </div>
    </div>
</div>
  )
}

export default LogoutModal