import React from 'react';

const category = ({ categoryName, click }) => (
  // <div className="d-flex p-3 justify-content-around">
  //   <Card
  //     className="text-info bg-gradient-white"
  //     style={{ height: 100, width: 250 }}
  //   >
  //     <Card.Body
  //       style={{ cursor: 'pointer' }}
  //       onClick={() => click(categoryName)}
  //     >
  //       <Card.Text className="text-center mt-2">
  //         <h4>{categoryName}</h4>
  //       </Card.Text>
  //     </Card.Body>
  //   </Card>
  // </div>
  <div
    className="col-4 d-flex justify-content-center"
    style={{ height: '150px' }}
  >
    <button className="btn btn-lg btn-primary btn-block" onClick={click}>
      {categoryName}
    </button>
  </div>
);
export default category;
