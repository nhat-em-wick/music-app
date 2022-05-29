import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import SongItem from "../../components/song-item/SongItem";
import Section, { SectionTitle } from "../../components/section/Section";
import Pagination from "../../components/pagination/Pagination";
import Helmet from "../../components/helmet/Helmet";
import zingApi from "../../api/zingApi";

import "./zing-chart.scss";

function getTitle(encodeId, arr) {
  for (let item of arr) {
    if (item.encodeId === encodeId) {
      return item.title;
    }
  }
}

const ZingChart = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);

  const [dataChart, setDataChart] = useState();
  const [songs, setSongs] = useState([]);
  const [songsTemp, setSongsTemp] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);

  const timerID = useRef();

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await zingApi.chartHome();
        setDataChart(response.data.RTChart.chart);
        setSongs(response.data.RTChart.items);
        setPagination({
          ...pagination,
          totalRecords: response.data.RTChart.items.length,
        });
        timerID.current = setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchChart();
    return () => clearTimeout(timerID.current)
  }, []);

  useEffect(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = (pagination.page - 1) * pagination.limit + pagination.limit;
    const records = songs.slice(start, end);
    setSongsTemp((prev) => [...prev, ...records]);
  }, [pagination]);

  const handleLoadMore = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const chartOption = {
    series: [
      {
        name:
          dataChart?.items && getTitle(Object.keys(dataChart.items)[0], songs),
        data:
          dataChart?.items &&
          Object.values(dataChart?.items)[0]?.map((item) => item.counter),
      },
      {
        name:
          dataChart?.items && getTitle(Object.keys(dataChart.items)[1], songs),
        data:
          dataChart?.items &&
          Object.values(dataChart?.items)[1]?.map((item) => item.counter),
      },
      {
        name:
          dataChart?.items && getTitle(Object.keys(dataChart.items)[2], songs),
        data:
          dataChart?.items &&
          Object.values(dataChart?.items)[2]?.map((item) => item.counter),
      },
    ],
    options: {
      responsive: [
        {
          breakpoint: 600,
          options: {
            xaxis: {
              show: false
            }
          }
        }
      ],
      colors: ["#4A90E2","#E35050", "#57BD9C"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: dataChart?.times?.map((item) => item.hour + ":00"),
      },
      yaxis: {
        show: false,
        min: dataChart?.minScore,
        max: dataChart?.maxScore,
      },
      legend: {
        show: false,
        position: "bottom",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <Helmet title="Bảng xếp hạng">
      <div className="zing-chart">
        <h2 className="zing-chart__title">#zingchart</h2>
        <div className="zing-chart__chart">
          <Chart
            options={
              theme === "dark"
                ? {
                    ...chartOption.options,
                    theme: { mode: "dark" },
                  }
                : {
                    ...chartOption.options,
                    theme: { mode: "light" },
                  }
            }
            series={chartOption.series}
            type="line"
            height="100%"
          />
        </div>
        <Section>
          <SectionTitle title="Bảng xếp hạng" />
          <div className="zing-chart__songs">
            {loading ? (
              <>
                {Array(10)
                  .fill()
                  .map((item, index) => (
                    <SongItem.Loading key={index} />
                  ))}
              </>
            ) : (
              <>
                {songsTemp.map((item, index) => (
                  <div key={index} className="zing-chart__songs__item">
                    <div className="zing-chart__songs__number">{index + 1}</div>
                    <div className="zing-chart__songs__info">
                      <SongItem
                        indexSong={index}
                        song={item}
                        songs={songs}
                        hiddenInput={true}
                      />
                    </div>
                  </div>
                ))}
                {songs.length > 0 ? (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handleLoadMore}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </Section>
      </div>
    </Helmet>
  );
};

ZingChart.propTypes = {};

export default ZingChart;
