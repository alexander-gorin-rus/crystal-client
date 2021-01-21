import React, { useRef, useState, useEffect } from 'react'
import {readOrder} from '../../functions/orders';
import {PrintInvoice} from './PrintInvoice'
import { getHomePage } from '../../functions/homePage';
import { useReactToPrint } from 'react-to-print';


const AdminInvoice1 = ({ match }) => {

  const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoices, setInvoices] = useState([]);
  const [companyInfo, setCopmanyInfo] = useState([]);

  let { id } = match.params;

  useEffect(() => {
    getHomePage().then((res) => setCopmanyInfo(res.data))
    //console.log(JSON.stringify(homePage, null, 4))
}, []);

  useEffect(() => {
    loadInvoice()
  },[])

  const loadInvoice = () => {
    readOrder(id).then(res => {
      setInvoices(res.data)
    })
  }
  return (
    <div>
      <div>
        <PrintInvoice order={invoices} companyInfo={companyInfo} ref={componentRef}s />
        <button className="bg-success" onClick={handlePrint}>Отправить на печать</button>
    </div>
    </div>
  )
}

export default AdminInvoice1
