import MainLayout from "./pages/layout/MainLayout";
import { useGetProductsQuery } from "./redux/api/baseApi";

function App() {
  const { data } = useGetProductsQuery(undefined);
  console.log({ data: data?.data }, "length: ", data?.length);
  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
