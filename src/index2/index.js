$(function(){ 
    // 发票信息
    var json={
        "发票校验码": "6229421614419351xxxx",
        "发票号码": "40159xxx",
        "销售方纳税人识别号": "9xxxxxxxxxxxxxxxxQ",
        "发票机器码": "66161995xxxx",
        "价格合计": "46.91",
        "购方联系方式": "",
        "价税合计": "52.47",
        "销售方联系方式": "北京市石景山区鲁谷大街东侧010-5970xxxx",
        "发票类型": "电子增值税普通发票",
        "是否作废": "N",
        "商品信息": "[{\"spec\":\"180ML\",\"amount\":\"5\",\"unit\":\"袋\",\"taxRate\":\"10\",\"name\":\"*乳制品*新希望天香透明袋纯牛奶180ML\",\"taxSum\":\"1.18\",\"priceUnit\":\"2.364\",\"priceSum\":\"11.82\"},{\"spec\":\"散装\",\"amount\":\"1.884\",\"unit\":\"KG\",\"taxRate\":\"10\",\"name\":\"*水果*三红蜜柚\",\"taxSum\":\"2.05\",\"priceUnit\":\"10.891\",\"priceSum\":\"20.52\"},{\"spec\":\"550ML*12\",\"amount\":\"1\",\"unit\":\"件\",\"taxRate\":\"16\",\"name\":\"*软饮料*农夫山泉天然水550ML*12（整件）\",\"taxSum\":\"2.33\",\"priceUnit\":\"14.569\",\"priceSum\":\"14.57\"}]",
        "数量合计": "7.884",
        "更新时间": "1545908940279",
        "税额合计": "5.56",
        "购方名称": "北京某某某科技有限公司",
        "发票代码": "01100180xxxx",
        "销售方开户行": "中国建设银行股份有限公司北京华贸支行110011334000525xxxxx",
        "开票日期": "20181xxx",
        "销售方名称": "北京永辉超市有限公司",
        "备注": "YHKP201811290000xxxx(201811269098LL088014349659xxxxx)",
        "购方开户行": "",
        "购方纳税人识别号": "xxxxxxxxxxxxxxxxxU"
    }
    // console.log(json["商品信息"])
    if(json){
        $(".machine_num").text(json["发票机器码"])
        $(".i_title").text(json["发票类型"])
    
        $(".i_code").text(json["发票代码"])
        $(".i_num").text(json["发票号码"])
        $(".i_year").text(json["开票日期"].substring(0,4))
        $(".i_month").text(json["开票日期"].substring(4,6))
        $(".i_date").text(json["开票日期"].substring(6,8))
        $(".i_checkout").text(json["发票校验码"].replace(/(.{5})/g, "$1 "))
    
        $(".i_buy_name").text(json["购方名称"])
        $(".i_buy_distinguish").text(json["购方纳税人识别号"])
        $(".i_buy_contact").text(json["购方联系方式"])
        $(".i_buy_bank").text(json["购方开户行"])
    
        $(".i_mongey").text(json["价格合计"])
        $(".i_paid").text(json["税额合计"])
    
        $(".i_big_num").text(turnUpcase(json["价税合计"]))
        $(".i_small_num").text(json["价税合计"])
    
        $(".i_sell_name").text(json["销售方名称"])
        $(".i_sell_distinguish").text(json["销售方纳税人识别号"])
        $(".i_sell_contact").text(json["销售方联系方式"])
        $(".i_sell_bank").text(json["销售方开户行"])
    
        $(".i_remarks").text(json["备注"])  
        var thingsArr=JSON.parse(json["商品信息"])
        for(var i=0;i<thingsArr.length;i++){
            var otr=$("<tr valign='top'></tr>")
            otr.append("<td width='179px'><span>&nbsp;"+thingsArr[i].name+"</span></td>")
            otr.append("<td width='58px'><span>&nbsp;"+thingsArr[i].spec+"</span></td>")
            otr.append("<td width='50px' align='center'><span>"+thingsArr[i].unit+"</span></td>")
            otr.append("<td width='80px' align='right'><span style='color:#2e2e2e'>"+thingsArr[i].amount+"&nbsp;</span></td>")
            otr.append("<td width='90px' align='right'><span style='color:#2e2e2e'>"+thingsArr[i].priceUnit+"&nbsp;</span></td>")
            otr.append("<td width='90px' align='right'><span style='color:#2e2e2e'>"+thingsArr[i].priceSum+"&nbsp;</span></td>")
            otr.append("<td width='40px' align='right'><span style='color:#2e2e2e'>"+thingsArr[i].taxRate+"&nbsp;</span></td>")
            otr.append("<td width='80px' align='right'><span style='color:#2e2e2e'>"+thingsArr[i].taxSum+"&nbsp;</span></td>")
            $(".itable_one").append(otr)
        }
        for(var i=0;i<(7-thingsArr.length);i++){
            var ot=$("<tr></tr>")
            ot.append("<td width='179px'><span></span></td>")
            ot.append("<td width='58px'><span></span></td>")
            ot.append("<td width='50px'><span></span></td>")
            ot.append("<td width='80px'><span></span></td>")
            ot.append("<td width='90px'><span></span></td>")
            ot.append("<td width='90px'><span></span></td>")
            ot.append("<td width='40px'><span></span></td>")
            ot.append("<td width='80px'><span></span></td>")
            $(".itable_one").append(ot)
        }       
    }
    //数字转换大写
    function turnUpcase(n){
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10); 
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '');
      }
}); 