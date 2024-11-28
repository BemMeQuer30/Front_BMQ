import { useEffect, useState } from "react";
import "./styles.css";
import UserService from "../../services/UserService";
import Skeleton from "../../components/skeleton";

type Legend = {
  title: string;
  color: string;
};

const doughnutLegends: Legend[] = [
  { title: "Skin Care", color: "bg-blue-500" },
  { title: "Olhos", color: "bg-teal-600" },
  { title: "Boca", color: "bg-purple-600" },
];

const lineLegends: Legend[] = [
  { title: "Orgânico", color: "bg-teal-600" },
  { title: "Pago", color: "bg-purple-600" },
];

const userService = new UserService();
function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - BMQ";
  }, []);

  const [dashboardData, setDashboardData] = useState<{
    totalUsers: number;
    totalOrdersCompleted: number;
    totalOrdersPending: number;
    totalSales: number;
  }>();
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await userService.dashboard(user.id);
      setDashboardData(response.dashboard);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    console.log(dashboardData);
  };
  return (
    <div className="c">
      <div className="dashboard">
        <div className="card-grid">
          {isLoading ? (
            <>
              <div className="info-card">
                <Skeleton className="short" />
                <Skeleton className="long" />
              </div>
              <div className="info-card">
                <Skeleton className="short" />
                <Skeleton className="long" />
              </div>
              <div className="info-card">
                <Skeleton className="short" />
                <Skeleton className="long" />
              </div>
              <div className="info-card">
                <Skeleton className="short" />
                <Skeleton className="long" />
              </div>
            </>
          ) : (
            <>
              <div className="info-card">
                <h3>Clientes</h3>
                <p>{dashboardData?.totalUsers}</p>
              </div>
              <div className="info-card">
                <h3>Faturamento</h3>
                <p>R${dashboardData?.totalSales}</p>
              </div>
              <div className="info-card">
                <h3>Vendas Mensais</h3>
                <p>{dashboardData?.totalOrdersCompleted}</p>
              </div>
              <div className="info-card">
                <h3>Contratos Pendentes</h3>
                <p>{dashboardData?.totalOrdersPending}</p>
              </div>
            </>
          )}
        </div>
        <div className="chart-grid">
          <div className="chart-card">
            <h2>Receita</h2>
            <div className="chart-placeholder">Doughnut Chart</div>
            <div className="chart-legend">
              {doughnutLegends.map((legend, i) => (
                <span key={i}>{legend.title}</span>
              ))}
            </div>
          </div>
          <div className="chart-card">
            <h2>Trafego</h2>
            <div className="chart-placeholder">Line Chart</div>
            <div className="chart-legend">
              {lineLegends.map((legend, i) => (
                <span key={i}>{legend.title}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// <Tabs>
//           <Tab label="Pedidos">
//             <div className="tab-content">
//               <div className="table-container">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Cliente</th>
//                       <th>Valor</th>
//                       <th>Status</th>
//                       <th>Data</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((user, i) => (
//                       <tr key={i}>
//                         <td>
//                           <div className="user-info">
//                             <img
//                               src={user.avatar}
//                               alt="User avatar"
//                               className="avatar"
//                             />
//                             <div>
//                               <p>{user.name}</p>
//                               <p>{user.job}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>${user.amount.toFixed(2)}</td>
//                         <td>
//                           {" "}
//                           <span
//                             className={`badge ${addClassByStatus(user.status)}`}
//                             data-tooltip={user.status}
//                           ></span>
//                         </td>

//                         <td>{new Date(user.date).toLocaleDateString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="pagination">
//                   <button
//                     onClick={() => onPageChange(page - 1)}
//                     disabled={page === 1}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() => onPageChange(page + 1)}
//                     disabled={page * resultsPerPage >= totalResults}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Tab>
//           <Tab label="Produtos">
//             <div className="tab-content">Conteúdo dos Produtos</div>
//           </Tab>
//         </Tabs>
