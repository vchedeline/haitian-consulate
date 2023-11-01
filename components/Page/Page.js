import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
// import { PageWrapper } from "context/page";
// import Head from "next/head";

export const Page = (props) =>  {
  return <div>
    <MainMenu items={props.mainMenuItems} callToActionDestination={props.callToActionDestination}
        callToActionLabel={props.callToActionLabel}/>
    <BlockRenderer blocks={props.blocks}/>
  </div>;
}