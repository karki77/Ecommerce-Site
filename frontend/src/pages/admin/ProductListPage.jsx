import { Row, Col, Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  
} from "../../slices/productSlice";
import Message from "../../components/Message";
import { toast } from "react-toastify";




function ProductListPage(){
    const {data: products, isLoading, error} = useGetProductsQuery();
    const [addProduct, {isLoading: productLoading}] = useAddProductMutation();
    const [deleteProduct, {isLoading:deleteProductLoading}] = useDeleteProductMutation();

 
    const addProductHandler = async () => {
        try{
            let resp = await addProduct().unwrap();
            toast.success(resp.message);
        } catch(err){
            toast.error(err.data.error);
        }
      };

      const deleteProductHandler = async (id) => {
        if(window.confirm("Are you sure you want to delete?")){ 
        try{
          
          let resp = await deleteProduct(id).unwrap();
          toast.success(resp.message);
        } catch(err){
          toast.error(err.data.error);
        }
      }

    };
    return (
        <>
          <Row className="align-items-center mb-3">
            <Col>
              <h2>Products</h2>
            </Col>
            <Col className="text-end">
              <Button variant="dark" size="sm" onClick={addProductHandler}>
                <FaEdit /> Create Product
              </Button>
            </Col>
          </Row>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <Message variant="danger">{error.data.error}</Message>
          ) : (
            <Table responsive hover striped className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Button
                        as={Link}
                        size="sm"
                        variant="light"
                        to={`/admin/product/${product._id}/edit`}
                      >
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="danger" className="mx-2">
                        <FaTrash style={{ color: "white" }} onClick={() => deleteProductHandler(product._id)}/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      );
    }
  
    
    export default ProductListPage;
    
