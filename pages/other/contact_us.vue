<template>
  <table class="headed">
    <tr class="head"><td colspan="2"><strong>Chair</strong></td></tr>
    <tr class="entry"><td>Peter Reed<br/></td>
      <td>0191 251 8739<br /><MailToLink to="chair@stedwardsfellwalkers.co.uk"/></td>
    </tr>
    <tr class="head"><td colspan="2"><strong>Secretary</strong></td></tr>
    <tr class="entry"><td>Helen Kay<br/></td>
      <td><MailToLink to="secretary@stedwardsfellwalkers.co.uk"/></td>
    </tr>
    <tr class="head"><td colspan="2"><strong>Walks Co-ordinator</strong></td></tr>
    <tr class="entry"><td>
      Gordon Philpott<br/></td>
      <td>0191 252 9345<br/><MailToLink to="walks@stedwardsfellwalkers.co.uk"/></td>
    </tr>
    <tr class="head"><td colspan="2"><strong>Treasurer</strong></td></tr>
    <tr class="entry"><td>John Clafton<br/></td>
      <td>0191 258 0964<br/><MailToLink to="treasurer@stedwardsfellwalkers.co.uk"/></td>
    </tr>
    <tr class="head"><td colspan="2"><strong>Bookings Secretary</strong></td></tr>
    <tr class="entry"><td>Sandra Sandy<br/>Pat Johnson</td>
      <td>0191 259 0173<br/><MailToLink to="bookings@stedwardsfellwalkers.co.uk"/>
      </td>
    </tr> <tr class="head"><td colspan="2"><strong>Membership Secretary</strong></td></tr>
    <tr class="entry"><td>Ray Salkeld<br/></td>
      <td>0191 253 1989<br/><MailToLink to="membership@stedwardsfellwalkers.co.uk"/>
      </td>
    </tr>
    <tr class="head"><td colspan="2"><strong>Social Secretary</strong></td></tr>
    <tr class="entry"><td>Judith Green<br/></td>
      <td><MailToLink to="social@stedwardsfellwalkers.co.uk"/></td>
    </tr>

    <tr class="head"><td colspan="2"><strong>Webmaster</strong></td></tr>
    <tr class="entry"><td>Aidan Nichol<br/></td>
      <td><MailToLink to="webmaster@stedwardsfellwalkers.co.uk"/></td>
    </tr>
  </table>
</template>
<script>
import MailToLink from '~/components/MailToLink';
export default {
  components: { MailToLink }
};
</script>

<style lang="scss">
table.headed {
  border-collapse: collapse;

  tr {
    background-color:none;
    &.head{
      background-color:#BBBBBB;
    }
  }
  tr td{
    padding: 3px 10px 3px 10px;
  }
  tr.entry td{
    height: 40px;
    vertical-align: middle;
  }

  th, td {
    border: 1px solid green;
  }
}
</style>
