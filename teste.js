
//<![CDATA[
var data;
var viewPontos;
var graficoFormat;
var graficoPontos;
var viewColumnsP = [0, 2, 4];
var arStats = [];
arStats['rodada'] = 0;
arStats['atleta_jogou'] = 1;
arStats['pontos_ult'] = 2;
arStats['pontos_media'] = 3;
arStats['preco'] = 4;
arStats['preco_variacao'] = 5;
arStats['confronto'] = 6;
arStats['mando'] = 7;
arStats['FS'] = 8;
arStats['PE'] = 10;
arStats['A'] = 12;
arStats['FT'] = 14;
arStats['FD'] = 16;
arStats['FF'] = 18;
arStats['G'] = 20;
arStats['I'] = 22;
arStats['PP'] = 24;
arStats['RB'] = 26;
arStats['FC'] = 28;
arStats['GC'] = 30;
arStats['CA'] = 32;
arStats['CV'] = 34;
arStats['SG'] = 36;
arStats['DD'] = 38;
arStats['DP'] = 40;
arStats['GS'] = 42;
arStats['pontos_cartoleta'] = {
    calc: cartoletaPontos,
    type: 'number',
    label: 'pontos/C$'
};
$(function() {
    $(".pontos_bloco li").click(function() {
        $(this).toggleClass("selecionado");
        console.log($(this).attr("stat"));
        toogleStat($(this).attr("stat"));
    });
    $(".graficopontos_filtro li").click(function() {
        $(this).addClass("navButtonAtivo").siblings().removeClass("navButtonAtivo");
        console.log($(this).attr("mando"));
        setMando($.parseJSON($(this).attr("mando")));
    });
});

function setMando(mando) {
    if (mando != undefined) {
        viewPontos.setRows(data.getFilteredRows([{
            column: arStats['mando'],
            value: mando
        }]));
    } else {
        viewPontos.setRows(0, data.getNumberOfRows() - 1);
    }
    graficoPontos.draw(viewPontos, graficoFormat);
}

function toogleStat(stat) {
    viewColumnsP = viewPontos.getViewColumns();
    viewColumnsP = toogleArray(viewColumnsP, arStats[stat]);
    viewPontos.setColumns(viewColumnsP);
    graficoPontos.draw(viewPontos, graficoFormat);
}

function toogleArray(a, n) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === n || (typeof(a[i]) == 'object' && a[i].calc == n.calc)) {
            a.splice(i, 1);
            return a;
        }
    }
    a.push(n);
    return a;
}

function cartoletaPontos(dataTable, rowNum) {
    var calculo = (dataTable.getValue(rowNum, 2) / dataTable.getValue(rowNum, 4));
    return (isNaN(calculo)) ? 0 : calculo;
}
google.load('visualization', '1', {
    'packages': ['table', 'corechart']
});
google.setOnLoadCallback(drawTable);

function drawTable() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'rodada', 'rodada');
    data.addColumn('boolean', 'jogou', 'atleta_jogou');
    data.addColumn('number', 'pontos', 'pontos_ult');
    data.addColumn('number', 'pontos média', 'pontos_media');
    data.addColumn('number', 'preço', 'preco');
    data.addColumn('number', 'preço var.', 'preco_variacao');
    data.addColumn('string', 'confronto', 'confronto');
    data.addColumn('boolean', 'mando', 'mando');
    data.addRow(['2015.05', false, 0.00, 0.00, 5.00, 0.00, 'cha x jec', false]);
    data.addRow(['2015.06', true, 1.65, 1.65, 4.89, -0.11, 'jec x cor', true]);
    var formatter3 = new google.visualization.NumberFormat({
        fractionDigits: '2'
    });
    formatter3.format(data, 2);
    formatter3.format(data, 3);
    formatter3.format(data, 4);
    formatter3.format(data, 5);
    var tabelaFormat = {
        allowHtml: true,
        showRowNumber: false,
        alternatingRowStyle: true,
        sortColumn: 0,
        cssClassNames: {
            headerRow: 'GGheaderRow',
            tableRow: 'GGtableRow',
            oddTableRow: 'GGoddTableRow',
            selectedTableRow: 'GGselectedTableRow',
            hoverTableRow: 'GGhoverTableRow',
            headerCell: 'GGheaderCell',
            tableCell: 'GGtableCell'
        }
    }
    var viewTabela = new google.visualization.DataView(data);
    viewColumns = [0, 1, 2, 3, 4, 5, 6, 7];
    for (var i = 8; i < data.getNumberOfColumns(); i += 2) {
        viewColumns.push(i);
    }
    viewTabela.setColumns(viewColumns);
    var table = new google.visualization.Table(document.getElementById('tabela_div'));
    table.draw(viewTabela, tabelaFormat);
    graficoFormat = {
        height: 400,
        width: 840,
        curveType: 'function',
        gridlineColor: '#ccc',
        backgroundColor: '#f6f6f6',
        legend: 'top',
        lineWidth: '4',
        pointSize: '6',
        chartArea: {
            width: "90%"
        },
        hAxis: {
            slantedText: 'true',
            slantedTextAngle: '90',
            textStyle: {
                fontSize: '11',
                fontColor: '#444'
            }
        }
    };
    viewPontos = new google.visualization.DataView(data);
    viewPontos.setColumns(viewColumnsP);
    graficoPontos = new google.visualization.LineChart(document.getElementById('graficopontos_div'));
    graficoPontos.draw(viewPontos, graficoFormat);
}
//]]>