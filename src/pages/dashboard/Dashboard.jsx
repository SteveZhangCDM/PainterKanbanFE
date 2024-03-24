import { useState } from "react";
import { useGetPaintsQuery } from "../../services/paintsSlice";
import Header from "../../components/layout/Header";
import Column from "../../components/dashboard/Column";
import Sticker from "../../components/dashboard/Sticker";
import BulkEditModal from "../../components/dashboard/BulkEditModal";
import { colors } from "../../static/colors";
import { statusClasses, statuses } from "../../static/statuses";

const Dashboard = () => {
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const { data: paints, error, isLoading } = useGetPaintsQuery();
  const userRole = localStorage.getItem("role");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching paints</div>;

  const handleOpenBulkEditModal = () => setIsBulkEditModalOpen(true);
  const handleCloseBulkEditModal = () => setIsBulkEditModalOpen(false);

  return (
    <>
      <Header />

      <div className="flex justify-between items-center p-2 bg-gray-100">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {(userRole === "admin" || userRole === "manager") && (
          <button
            onClick={handleOpenBulkEditModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Bulk Edit
          </button>
        )}
      </div>

      {/* Kanban */}
      <div className="flex justify-center items-start p-2 bg-gray-100 overflow-auto h-screen">
        <div className="flex overflow-auto bg-gray-100 p-4 items-start">
          {colors.map((color) => (
            <Column key={color} color={color}>
              {statuses.map((status) => (
                <div
                  key={status}
                  className={`flex flex-col p-2 ${statusClasses[status]}`}
                >
                  <h3 className="text-sm capitalize">{status}</h3>
                  {paints
                    .filter(
                      (paint) =>
                        paint.color === color && paint.status === status
                    )
                    .map((paint) => (
                      <Sticker key={paint._id} paint={paint} />
                    ))}
                </div>
              ))}
            </Column>
          ))}
        </div>
      </div>

      {isBulkEditModalOpen && (
        <BulkEditModal closeModal={handleCloseBulkEditModal} />
      )}
    </>
  );
};

export default Dashboard;
