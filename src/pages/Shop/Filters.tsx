import { Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Filters = ({ columnFilters, setColumnFilters }) => {
    const shift = columnFilters.find((f) => f.id === "shift")?.value || "";
    const area = columnFilters.find((f) => f.id === "area")?.value || "";
    const status = columnFilters.find((f) => f.id === "status")?.value || "";
    const date = columnFilters.find((f) => f.id === "businessDate")?.value || "";
    const onFilterChange = (id, value) =>
        setColumnFilters((prev) =>
            prev
                .filter((f) => f.id !== id)
                .concat({
                    id,
                    value,
                })
        );
    const Authers = [{ label: "CHECKED OUT", value: "CHECKED OUT" }, { label: "NOT CONFIRMED", value: "NOT CONFIRMED" }, { label: "SEATED", value: "SEATED" }, { label: "CONFIRMED", value: "CONFIRMED" }]
    const stores = [
        { label: "MAIN ROOM", value: "MAIN ROOM" },
        { label: "BAR", value: "BAR" },
    ]
    const leastPrices = [
        { label: "BREAKFAST", value: "BREAKFAST" },
        { label: "LUNCH", value: "LUNCH" },
        { label: "DINNER", value: "DINNER" },
    ]

    return (
        <>
            <Col md={2} spacing={3}>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="select"
                        onChange={(e) => onFilterChange("auther", e.target.value)}
                        value={shift}
                    >
                        <option value="" disabled>
                            Auther
                        </option>
                        {Authers.length &&
                            Authers.map((auther, index) => {
                                return (
                                    <option value={auther.value} key={index}>
                                        {auther.label}
                                    </option>
                                );
                            })}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={2} spacing={3}>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="select"
                        onChange={(e) => onFilterChange("store", e.target.value)}
                        value={area}
                    >
                        <option value="" disabled>
                            Store
                        </option>
                        {stores.length &&
                            stores.map((store, index) => {
                                return (
                                    <option value={store.value} key={index}>
                                        {store.label}
                                    </option>
                                );
                            })}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={2} spacing={3}>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="select"
                        onChange={(e) => onFilterChange("leastPrice", e.target.value)}
                        value={status}
                    >
                        <option value="" disabled>
                        Least Prices
                        </option>
                        {leastPrices.length &&
                            leastPrices.map((leastPrice, index) => {
                                return (
                                    <option value={leastPrice.value} key={index}>
                                        {leastPrice.label}
                                    </option>
                                );
                            })}
                    </Form.Control>
                </Form.Group>
            </Col>
        </>
    );
};
Filters.propTypes = {
    columnFilters: PropTypes.object,
    setColumnFilters: PropTypes.func,
}
export default Filters;
