import {FC} from 'react';
import Error from "../components/Error";
import RegisterBox from "../components/RegisterBox";
import {useRouter} from "next/router"
import {useQuery} from "@apollo/client";
import {
    RegistrationCodeVerification,
    VerifyRegistrationCodePayload,
    VerifyRegistrationCodeQuery
} from "../data/VerifyRegistrationCode";
import UserErrors from "../components/UserErrors";
import {isError} from "../data/graphql";
import {RingLoader} from "react-spinners";

const Auth: FC = () => {
    const router = useRouter();
    let code = router.query.code?.toString();
    const {data, loading, error} = useQuery<VerifyRegistrationCodePayload>(VerifyRegistrationCodeQuery, {
        variables: {
            code: code,
        },
        skip: code == null
    });

    let ctuSuccess = false;
    let discordSuccess = false;

    if (!router.isReady) {
        return <RingLoader color="#0065bd" size={100} />;
    }

    if (code) {
        if (loading) {
            return <RingLoader color="#0065bd" size={100} />;
        }

        if (isError(data, error) || data == undefined) {
            return <UserErrors responseData={data} apolloError={error}
                               defaultMessage="Došlo k chybě při načítání stavu registrace."/>;
        }

        switch (data.verifyRegistrationCode.verificationStage) {
            case RegistrationCodeVerification.DiscordAuthorized:
            case RegistrationCodeVerification.CtuAuthorized:
                discordSuccess = true;
                break;
            case RegistrationCodeVerification.Done:
                discordSuccess = true;
                ctuSuccess = true;
                break;
            case RegistrationCodeVerification.NotValid:
                router.push("/auth");
                code = undefined;
                break;
        }
    }

    return <RegisterBox ctuSuccess={ctuSuccess} discordSuccess={discordSuccess} code={code}/>;
};

export default Auth;
