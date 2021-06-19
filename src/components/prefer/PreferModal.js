import { Row, Col } from "antd";
import { useContext, useEffect} from "react";
import { StoreContext } from "../../store"
import PreferItem from "./PreferItem";
import BreadcrumbItem from "../normal/BreadcrumbItem";
import Cookie from "js-cookie";

export default function PreferModal() {
   const { state: { preferItems } } = useContext(StoreContext);

   useEffect(()=>{
      Cookie.set("preferItems", JSON.stringify(preferItems));
   }, [preferItems])

   return (
      <div>
         <BreadcrumbItem link={'Prefer'} name={'想去ㄉ活動'} />
         {preferItems.length === 0 ? (
            <div className="nopreference">泥還沒有喜歡ㄉ活動，泥484不喜歡我˚‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·˚</div>
         ) : (
            <Row gutter={[24, 16]}>
               {preferItems.map(item => (
                  <Col 
                     key={item.id} 
                     sm={{ span: 12 }} 
                     md={{ span: 8 }}
                     lg={{ span: 6 }}
                     xl={{ span: 6 }}
                     xxl={{ span: 6 }}
                  >
                  <PreferItem item={item}/>
                  </Col>
               ))}
            </Row> 
         )}
      </div>
   );
}