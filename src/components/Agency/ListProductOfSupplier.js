import { FaFileExport } from "react-icons/fa";
import TableListProduct from "./Table/TableListProduct";
import Container from "react-bootstrap/Container";
import { MdNoteAdd } from "react-icons/md";
import ModalAddNew from "./Modal/ModalAddNew";
import { useEffect, useState } from "react";
import { getListProductOfSupplierService } from "../../services/appService";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { BsSearch } from "react-icons/bs";
import jsPDF from "jspdf";
import ReactPaginate from "react-paginate";
import { keyMap } from "../../utils/constant";

function ListProductOfSupplier() {
    const language = useSelector(state => state.app.language)
    const [isShowModelAddNew, setIsShowModalAddNew] = useState();
    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    //
    const [selectedTab, setSelectedTab] = useState("Order Status");


    const handleExportPDF = () => {
        let doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("product.pdf");
    };


    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [listProduct, setListProduct] = useState([])
    const getListProducts = async (options) => {
        setIsLoading(true)
        let response = await getListProductOfSupplierService(options)
        setIsLoading(false)
        if (response && response.errCode === 0) {
            setListProduct(response.data.products)
            setTotalPages(response.data.totalCount)
        } else {
            toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
        }
    }

    useEffect(() => {
        getListProducts({ pageSize: 10, pageIndex })
    }, [pageIndex])

    const handleChangePage = () => {

    }

    return (
        <>
            <Container className="z-n1">
                <div className="my-3 d-flex justify-content-between">
                    <span> Product:</span>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            className="btn btn-primary d-flex align-items-center "
                            onClick={() => setIsShowModalAddNew(true)}
                        >
                            <MdNoteAdd />
                            Add new Product
                        </button>
                    </div>
                </div>


                <div className=" tool_container colum d-flex align-items-center justify-content-between ">
                    <div className=" tool_container-content col-sm-5 colum d-flex align-items-center">
                        <input
                            type="text"
                            class="form-control"
                            id="inputPassword2"
                            placeholder="Search..."
                        />
                        <div className="col-auto">
                            <button class="btn btn-primary mb-3">
                                <BsSearch />
                            </button>
                        </div>
                    </div>
                    <div class=" d-grid gap-2">
                        <button
                            onClick={handleExportPDF}
                            className="btn btn-primary d-flex align-items-center "
                        >
                            <FaFileExport />
                            Export PDF
                        </button>
                    </div>
                </div>


                <TableListProduct data={listProduct} getListProducts={getListProducts} />

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handleChangePage}
                    pageRangeDisplayed={5}
                    pageCount={totalPages} // lấy tổng số trang trong API
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />

            </Container>
            <ModalAddNew show={isShowModelAddNew} handleClose={handleClose} getListProducts={getListProducts} />
        </>
    );
}

export default ListProductOfSupplier;
