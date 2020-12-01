import React, { useEffect, useState } from "react";
import "../styles/global.sass";
import { ChevronDown, ChevronUp } from "react-feather";

export default function DropDown(props: { list: any; title: any; }) {
  const list = props.list;
  const [location, setLocation] = useState(props.list);
  const [listOpen, setListOpen] = useState(false);
  const [nestlistOpen, setnestListOpen] = useState(false);
  const [nestItem, setNestItem] = useState({id:0,key:'',selected:false,label:'',value:'',options:[]});
  const [keyword, setkeyword] = useState("");
  const [headerTitle, setHeadeTitle] = useState(props.title);

  const toggleItem = (id: string | number , key: any) => {
    let tempp = list[id];
    
    setNestItem({id:tempp.id,key:tempp.key,selected:tempp.selected,
      label:tempp.label,value:tempp.value,options:tempp.options});
    setnestListOpen((prevState) => !prevState);
    setkeyword("");
    let temp = list[id];
    temp.selected = !temp.selected;
    list[id] = temp;
    //  setHeadeTitle(list[id].value)
    setLocation(temp.selected);
  };
  const toggleNestItem = (id: React.Key, opId: React.Key) => {
    let temp = list[id].options[opId];
    console.log(temp.value);
    setHeadeTitle(temp.value);
    setLocation(list[id].selected);
  };

  const toggleList = () => {
    setListOpen((prevState) => !prevState);
    setkeyword("");
  };
  return (
    <div className="dd-wrapper">
      <div className="dd-headers" onClick={toggleList}>
        <div className="dd-header-title">{headerTitle}</div>
        {listOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>
      {listOpen && (
        <ul className="dd-list">
          {list.map((item: { id: string | number ; key: any; value: React.ReactNode; }) => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => toggleItem(item.id, item.key)}
            >
              <div className="dd-header">
                <div className="dd-header-titles">
                  {item.value}
                  <div>
                    {nestlistOpen ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </div>

                {nestlistOpen && nestItem.id === item.id ? (
                  <ul style={{ display: "flex", flexDirection: "column" }}>
                    {nestItem.options.map((ite: { id: string | number; value: React.ReactNode; }) => (
                      <li
                        key={ite.id}
                        className="dd-list-item"
                        onClick={() => toggleNestItem(item.id, ite.id)}
                      >
                        <div className="dd-header-title-list">{ite.value}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul></ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
