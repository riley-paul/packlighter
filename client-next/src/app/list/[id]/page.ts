import React from "react";

interface Props {
  params: { id: string };
}

const ListPage: React.FC<Props> = (props) => {
  const {
    params: { id },
  } = props;

  return <div>List page {id}</div>;
};

export default ListPage;
