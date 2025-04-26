import StripeElement from '@/components/common/StripeElement'
import PaymentCheckout from '@/components/PaymentCheckout'
import React from 'react'

const page = () => {
  return (
   <>
   <StripeElement>
        <PaymentCheckout />
      </StripeElement>
   </>
  )
}

export default page