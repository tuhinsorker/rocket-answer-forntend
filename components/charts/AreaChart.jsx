import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // const settings = {
  const series = [
    {
      name: "",
      data: [10, 20, 5, 35],
    },
  ];

  const defaultOptions = {
    fill: {
      type: "gradient",
      colors: "#084277",
      gradient: {
        shade: "#1a1d1f",
        shadeIntensity: 1,
        opacityFrom: 4,
        opacityTo: 0.9,
        stops: [20, 100],
      },
    },
    title: {
      text: "Total consultations I used",
      align: "center",
      margin: 0,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#084277",
      },
    },
    chart: {
      background: "#fff",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: "#084277",
      width: 3.5,
    },
    xaxis: {
      type: "category",
      categories: ["Dr", "Eng", "Lawyer", "Etc"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: true,
      tickAmount: 10,
      min: 0,
      max: 40,
      labels: {
        formatter: function (value) {
          return `${value}`;
        },
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(111, 118, 126, 0.1)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 30,
        bottom: 0,
        left: 20,
      },
    },
    markers: {
      size: 5,
      colors: "#084277",
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 1,
      hover: {
        size: 5,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: undefined,
      },
      x: {
        show: true,
        //   format: "MMMM",
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          // return "February 5, 2023 1:22 PM";
          return series;
        },
      },
      y: [
        {
          formatter: undefined,
          title: {
            formatter: (val) => `${val}`,
          },
        },
      ],
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: false,
      },
    },
  };

  return (
    <ApexCharts
      type="area"
      options={defaultOptions}
      series={series}
      height={isMobile ? 300 : 500}
    />
  );
};

export default AreaChart;
