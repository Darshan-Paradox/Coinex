import './BaseTemplate.css'
import ChartBG from "../../assets/chartbg.png";

function BaseTemplate() {
  return (
    <>
      <img src={ChartBG} class="bgimg"/>
      <div class="main-title">
        <b>
          WELCOME TO C<span class="material-symbols-outlined" id="bitcoin">currency_bitcoin</span>INEX!
        </b>
      </div>
    </>
  );
}

export default BaseTemplate;
