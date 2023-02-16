export default function CartItemsList() {
  return (
    <div className="bg-white shadow   p-4 sm:p-6 xl:p-8 ">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex justify-start gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Your Bag</h3>
            <span className="text-base font-normal text-gray-500">
              This is the list of your items
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="p-4 text-sm font-normal text-gray-900">
                      Payment from{" "}
                      <span className="font-semibold">Bonnie Green</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      Apr 23 ,2021
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      $2300
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4  text-sm font-normal text-gray-900 rounded-lg rounded-left">
                      Payment refund to{" "}
                      <span className="font-semibold">#00910</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      Apr 23 ,2021
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      -$670
                    </td>
                  </tr>
                  {/*  <tr>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
			    Payment failed from{' '}
			    <span className="font-semibold">#087651</span>
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
			    Apr 18 ,2021
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
			    $234
			  </td>
			</tr>
			<tr className="bg-gray-50">
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
			    Payment from{' '}
			    <span className="font-semibold">Lana Byrd</span>
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
			    Apr 15 ,2021
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
			    $5000
			  </td>
			</tr>
			<tr>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
			    Payment from{' '}
			    <span className="font-semibold">Jese Leos</span>
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
			    Apr 15 ,2021
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
			    $2300
			  </td>
			</tr>
			<tr className="bg-gray-50">
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
			    Payment from{' '}
			    <span className="font-semibold">THEMESBERG LLC</span>
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
			    Apr 11 ,2021
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
			    $560
			  </td>
			</tr>
			<tr>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
			    Payment from{' '}
			    <span className="font-semibold">Lana Lysle</span>
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
			    Apr 6 ,2021
			  </td>
			  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
			    $1437
			</tr>
			  </td> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
