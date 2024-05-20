import { Button } from "@/components/ui/button";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex flex-col rounded-lg shadow-lg">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="bg-slate-100">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider"
                    >
                      File Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider"
                    >
                      Date Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-yellow-600 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">file1.txt</td>
                    <td className="px-6 py-4 whitespace-nowrap">2021-09-01</td>
                    <td className="px-6 py-4 whitespace-nowrap">Text</td>
                    <td className="flex px-6 py-4 whitespace-nowrap gap-2 justify-center">
                      <Button className="text-white flex gap-2  hover:bg-blue-800 bg-blue-600">
                        <FaCloudDownloadAlt />
                        Download
                      </Button>
                      <Button className="text-white flex gap-2 hover:bg-red-700 bg-red-600">
                        <MdDelete />
                        Delete
                      </Button>
                    </td>
                  </tr>
                  {/* Repeat for other rows */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
