import { Image } from "antd";
import {ROUTES} from "../constants/routes.js";

const Home = () => {
    return (
      <div className="welcome">
          <Image src="/src/images/wordart.png" width={"60%"} preview={false}/>
      </div>
    );
  }
  
  export default Home