import { Container, Row, Col } from "react-bootstrap";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import './Summary.css';
import { getSummaryData } from "../../routes/getSummaryData";
import { convertToDayMonthYear, getTodayFormatted } from "../../utils/dateConfig";
import { useState, useEffect } from "react";

export const Summary = () => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSummaryData(getTodayFormatted());
            const result = response?.data?.[0]; 
            setSummaryData(result);
        };
        fetchData();
    }, []);

    if (!summaryData) {
        return <div>Carregando dados...</div>; 
    }

    const {
        pontos,
        variacao_dia,
        min_dia,
        max_dia,
        date,
    } = summaryData;

    const variationValue = parseFloat(variacao_dia.replace('%', '').replace('+', ''));
    const isPositive = variationValue >= 0;
    const color = isPositive ? 'green' : 'red';

    return (
        <Container className="mt-5 mb-3">
            <Row>
                <Col className="d-flex flex-row align-items-center">
                    <h3>{pontos}</h3><span> pontos</span>
                </Col>

                <Col className="d-flex flex-row align-items-center">
                    {isPositive ? (
                        <TiArrowSortedUp style={{ color }} />
                    ) : (
                        <TiArrowSortedDown style={{ color }} />
                    )}
                    <h3 style={{ color }}>{variacao_dia}</h3>
                    <span>variação</span>
                </Col>

                <Col className="d-flex flex-row align-items-center">
                    <h3>{min_dia}</h3><span className="label">(Mín. dia.)</span>
                </Col>

                <Col className="d-flex flex-row align-items-center">
                    <h3>{max_dia}</h3><span className="label">(Máx. dia.)</span>
                </Col>

                <Col className="d-flex flex-row align-items-center">
                    <span>{convertToDayMonthYear(date)} Dia</span>
                </Col>
            </Row>
        </Container>
    );
};
