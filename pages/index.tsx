import type { NextPage } from "next";
import MainPage from "../navigation/MainPage";
import { observer } from "mobx-react";

const Home: NextPage = observer(() => {
  return <MainPage />;
});

export default Home;
