import React, { Component } from "react";
import "../css/movingstrip2.css";
const littleStyle = {
  list: {
    display: "flex",
    gap: "5px",
    animation: "movingStrip 10s infinite linear",
    width: "100%",
  },
};
class MovingStrip extends Component {
  render() {
    const motors = [
      'هوندا CBR',
      'یاهاما R1',
      'کاوازاکی نینجا',
      'سوزوکی GSX',
       'BMW S1000RR',
       'دوکاتی پانیگاله',
       'KTM Duke',
       'آپریلیا RSV4',
       'تریومف Daytona',
       'MV Agusta',
       'بنلی 600'
    ];

    return (
      <div className="papa">
        {/* <div className="list" style={littleStyle.list}>
             <span className="item">تیگو دوس ممد پرو</span>
             <span className="item">شاهین</span>
             <span className="item">پراید 131 SE</span>
             <span className="item">پراید وانت</span>
             <span className="item">نسیان دوگانه سوز</span>
             <span className="item">جک S4</span>
             <span className="item">چانگ آن</span>
             <span className="item">پژو405</span>
             <span className="item">پیکان</span>
             <span className="item">فونیکس</span>
             <span className="item">جاشوآ</span>
        </div>

          <div className="list" style={littleStyle.list}>
             <span className="item">تیگو دوس ممد پرو</span>
             <span className="item">شاهین</span>
             <span className="item">پراید 131 SE</span>
             <span className="item">پراید وانت</span>
             <span className="item">نسیان دوگانه سوز</span>
             <span className="item">جک S4</span>
             <span className="item">چانگ آن</span>
             <span className="item">پژو405</span>
             <span className="item">پیکان</span>
             <span className="item">فونیکس</span>
             <span className="item">جاشوآ</span>
          </div> */}

        <div className="list">
          {motors.map((motor, i) => (
            <span className="item" key={`b-${i}`}>
              {motor}
            </span>
          ))}
        </div>

        <div className="list">
          {motors.map((motor, i) => (
            <span className="item" key={`b-${i}`}>
              {motor}
            </span>
          ))}
        </div>

      </div>
    );
  }
}
export default MovingStrip;
