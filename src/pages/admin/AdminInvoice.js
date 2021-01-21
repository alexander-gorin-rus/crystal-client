import React from 'react';
import Printer, {print} from 'react-pdf-print'

const AdminInvoice = ({ order, companyInfo }) => {
    return (
        <>
            {companyInfo.map((c, i) => (
              <div key={i}>
                <p className="appendix">{c.appendix}</p>

                <span className="formNumber">Форма 3-2</span>

                <div className="companyInfo">
                  <span className="textScale1">Организация(индивидуальный предприниматель)</span>
                  <span className="textScale2">{c.title}</span>
                  <span className="textScale3">ИИН/БИН{" "}<span className="iin">{c.iin}</span></span>
                </div>

                
              <table className="textScale2 table table-bordered docNumber">
                <thead>
                  <tr>
                    <th scope="col">Номер документа</th>
                    <th scope="col">Дата составления</th>
                  </tr>
                </thead>
                <tbody>
                  <td></td>
                  <td>{new Date(order.paymentIntent.created).toLocaleString()}</td>
                </tbody>
              </table>

              <h5 className="text-center mt-3 mb-3">Накладная на отпуск товаров на сторону</h5>
           
              <table className="table table-bordered textScale1">
                <thead>
                  <tr>
                    <th scope="col">{`Организация (индивидуальный предприниматель) - отправитель`}</th>
                    <th scope="col">{`Организация (индивидуальный предприниматель) - получатель`}</th>
                    <th scope="col">{`Ответственный за поставку (Ф И О)`}</th>
                    <th scope="col">Транспортная организация</th>
                    <th scope="col">{`Товаро-транспортная накладная (номер, дата)`}</th>
                  </tr>
                </thead>
                <tbody>
                  {companyInfo.map((c, i) => (
                    <tr key={i}>
                      <td>{c.title}</td>
                      <td>получатель</td>
                      <td>{c.responsiblePerson}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="table table-bordered mt-4" >
                <thead >
                      <tr>
                          <th scope="col">Номер по порядку</th>
                          <th scope="col">Наименование, характеристика</th>
                          <th scope="col">Номенклатурный номер</th>
                          <th scope="col">Единица измерения</th>
                          <th scope="col">Подлежит отпуску</th>
                          <th scope="col">Отпущено</th>
              
                          <th scope="col">Цена за единицу, в KZT</th>
                          <th scope="col">Сумма с НДС, в KZT</th>
                          <th scope="col">Сумма НДС, в KZT</th>
                      </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col">1</th>
                      <th scope="col">2</th>
                      <th scope="col">3</th>
                      <th scope="col">4</th>
                      <th scope="col">5</th>
                      <th scope="col">6</th>
                      <th scope="col">7</th>
                      <th scope="col">8</th>
                      <th scope="col">9</th>
                    </tr>
                  </thead>
                
                <tbody>
                    {order.products.map((p, i) => (
                        <tr key={i}>
                          <td>number</td>
                            <td>
                                <b>{p.product.title}</b>
                            </td>
                            <td>{p.product.nn}</td>
                            <td>шт</td>
                            <td>{p.count}</td>
                            <td>{p.count}</td>
                            <td>{p.product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                
              </div>
            ))}
          </>
    )
}

export default AdminInvoice
