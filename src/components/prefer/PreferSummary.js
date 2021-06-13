import { useContext } from "react";
import { Badge } from "antd";
import { StoreContext } from "../../store";

export default function PreferSummary() {
  const { state: { preferItems } } = useContext(StoreContext);

  let count = (preferItems.length > 0) ?
    preferItems.reduce((sum) => sum + 1, 0)
    : 0;
    
  return (
    <div >
      <Badge className="nav-item nav-prefer" count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
        想去ㄉ活動
      </Badge>
    </div>
  );
}
