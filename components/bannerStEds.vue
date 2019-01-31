<template>
  <nuxt-link to="/">
  <div class="banner">
    <span>St. Edward's ABC Fellwalkers</span>
  </div>
  </nuxt-link>
</template>

<script>
export default {};
</script>

<style lang="scss" >
.head {

.banner{
  box-sizing: border-box;

  width:100%;
  height: 100px;
  margin:0;
  top:0;
  background-image:url(~assets/image/bannerheadW.jpg);
  background-color:#ddd;
  font-size:2em;
  line-height:1;
  padding-left: 120px;
  z-index:5;
  color:white;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;


  & span {
    text-decoration: none;
    display:block;
    height:auto;
    line-height: 1;
    align-self: center;
    color: #CC3300;
  }
}
.bannerS{
    height:67px;
    width:400px;
    background-image:url(/image/bannerheadS.jpg);
    font-size:1.2em; z-index:5; color:white;
    line-height:67px;

}

p, div{
    font-weight: bolder;
    font-style: normal;
    /*margin-left: 180px;*/
}
@media only screen and (max-width: 650px) {
  .banner {
    padding-left: 120px;
  }

}
@media only screen and (max-width: 400px) {
  .banner {
    padding-left: 85px;
    padding-right: 0.5em;
    background-image:url(~assets/image/bannerheadS.jpg);
    height:67px;
    font-size:1.5em;


  }
}
}

// #TopMenu{
//   margin:0;
//   width:100%;
//   border-bottom: 1px solid #ccc;
//   -x-system-font:none;
//   display: flex;
//
//
// }
// #TopMenu > * {
//   flex: 1 1 auto;
// }
// #TopMenu ul li{
//   list-style-image:none;
//   list-style-position:outside;
//   list-style-type:none;
//   padding:0;
//   margin:0;
// }
// #TopMenu ul{
//   /*float:left;*/
//   padding:0;
//   margin:0;
//   position:relative;
//   top:0px;
// }
// #TopMenu a{
//   letter-spacing: 1px;
//   text-align: center;
//   border-left: 1px solid #ccc;
//   border-right: none;
//   cursor: pointer;
//   color: #CC3300;
//   font-family:Tahoma,Verdana,Geneva,Helvetica,sans-serif;
//   /*font-size:11px;*/
//   font-size-adjust:none;
//   font-stretch:normal;
//   font-style:normal;
//   font-variant:normal;
//   font-weight:normal;
//   line-height:normal;
//   padding: 0 15px;
//   line-height:20px;
//   display:block;
// }
// #TopMenu a:hover {
//     color: #000;
//     background: #ccc;
//   }
</style>
