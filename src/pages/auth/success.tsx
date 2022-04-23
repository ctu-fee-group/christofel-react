import {FC} from "react";
import RegisterBox from "../../components/RegisterBox";

const Success: FC = () => {
    return <RegisterBox discordSuccess={true} ctuSuccess={true}/>;
};

export default Success;