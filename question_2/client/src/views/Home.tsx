import DeleteButton from "@/components/DeleteButton";
import ShareButton from "@/components/ShareButton";
import OrderButton from "@/components/OrderButton";
import UploadButton from "@/components/UploadButton";
import { Button } from "@/components/ui/button";
import { IDocument } from "@/interfaces/document-interface";
import { instance } from "@/utils/axios";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import SortButton from "@/components/SortButton";

export default function Home() {
  document.title = "Home - ShareFlow";
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [orderValue, setOrderValue] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const fetchUserDocuments = async () => {
    try {
      const response = await instance.get(
        `/document${orderValue ? `?orderBy=${orderValue}` : `?orderBy=asc`}${
          sortValue ? `&sortBy=${sortValue}` : `&sortBy=title`
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // Set the documents state with the response data
        // setDocuments(response.data);
        setDocuments(response.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDocuments();
  }, [orderValue, sortValue]);

  return (
    <div className="p-6">
      <h1 className=" p-6 text-2xl font-bold text-gray-800">My Documents</h1>
      <div className="flex justify-end mb-6 gap-3">
        <SortButton setSortValue={setSortValue} />
        <OrderButton setOrderValue={setOrderValue} />
        <UploadButton fetchUserDocuments={fetchUserDocuments} />
      </div>

      <div className="flex flex-col rounded-lg shadow-lg">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex flex-col">
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
                          {documents.map((document, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {document.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {document.createdAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {document.docType}
                                </td>
                                <td className="flex px-6 py-4 whitespace-nowrap gap-4 justify-center">
                                  <Button
                                    onClick={() =>
                                      window.open(document.documentUrl)
                                    }
                                    className="text-white flex gap-2  hover:bg-blue-800 bg-blue-600"
                                  >
                                    <FaCloudDownloadAlt />
                                    Download
                                  </Button>

                                  <DeleteButton
                                    id={document.id}
                                    fetchUserDocuments={fetchUserDocuments}
                                  />
                                  <ShareButton documentId={document.id} />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
