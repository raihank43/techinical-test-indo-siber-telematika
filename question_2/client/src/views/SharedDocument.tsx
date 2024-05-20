import { Button } from "@/components/ui/button";

import { instance } from "@/utils/axios";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

import { ISharedDocument } from "@/interfaces/shared-document-interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertTimestamp from "@/utils/convertTimestamp";

export default function SharedDocument() {
  document.title = "Shared Document - ShareFlow";

  const [documents, setDocuments] = useState<ISharedDocument[]>([]);

  const fetchSharedDocuments = async () => {
    try {
      const response = await instance.get("/shared-document", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setDocuments(response.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSharedDocuments();
  }, []);
  return (
    <div className="p-6">
      <h1 className=" p-6 text-2xl font-bold text-gray-800">
        My Shared Documents
      </h1>

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
                              className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider"
                            >
                              Owner
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
                          {documents.map((sharedDocument, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {sharedDocument.document.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {convertTimestamp(
                                    sharedDocument.document.createdAt
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {sharedDocument.document.docType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center ">
                                    <Avatar>
                                      <AvatarImage
                                        src={`https://api.dicebear.com/8.x/adventurer/png?seed=${sharedDocument.document.user.name}`}
                                      />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {sharedDocument.document.user.name}
                                  </div>
                                </td>
                                <td className="flex px-6 py-4 whitespace-nowrap gap-4 justify-center">
                                  <Button
                                    onClick={() =>
                                      window.open(
                                        sharedDocument.document.documentUrl
                                      )
                                    }
                                    className="text-white flex gap-2  hover:bg-blue-800 bg-blue-600"
                                  >
                                    <FaCloudDownloadAlt />
                                    Download
                                  </Button>
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
