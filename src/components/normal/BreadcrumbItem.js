import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';

export default function BreadcrumbItem({link, name}){
    return(
        <Breadcrumb className="breadcrumb--1">
            <Breadcrumb.Item className="breadcrumb">
               <Link to={`/Home`}>
               首頁
               </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/${link}`} className="breadcrumb-item">
                  {name}
               </Link>
            </Breadcrumb.Item>
    </Breadcrumb>
    );
} 