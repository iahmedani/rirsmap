  $.ajax({
            url: 'http://me.wfp.org.pk:8003/rirsmap/php/data.php',
            method: 'GET',
            dataType: 'JSON',
            success: function (data){
                var resolved = [];
                var closed =[];
                var open = [];
                var actCash = [];
                var actFood =[];
                var actRelief =[];
                var actCMAM = [];
                var actSf =[];
                var actStp =[];
                var actCashHigh = [];
                var actFoodHigh =[];
                var actReliefHigh =[];
                var actCMAMHigh = [];
                var actSfHigh =[];
                var actStpHigh =[];
                var actCashMedium = [];
                var actFoodMedium =[];
                var actReliefMedium =[];
                var actCMAMMedium = [];
                var actSfMedium =[];
                var actStpMedium =[];
                var actCashLow = [];
                var actFoodLow =[];
                var actReliefLow =[];
                var actCMAMLow = [];
                var actSfLow =[];
                var actStpLow =[];
                for (i=0; i< data.length; i++){
                    if (data[i].status.includes('Resolved')){
                        resolved.push(data[i].status)
                    } else if (data[i].status.includes('Closed')){
                        closed.push(data[i].status);
                    } else{
                        open.push(data[i].status);
                    };
                    
                    if (data[i].Activity.includes('FFT_Cash') || data[i].Activity.includes('FFA_Cash')){
                        actCash.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actCashHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                            actCashMedium.push(data[i].priority);
                        } else {
                            actCashLow.push(data[i].priority);
                        };
                    } else if (data[i].Activity.includes('FFT_Food') || data[i].Activity.includes('FFA_Food')){
                        actFood.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actFoodHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                            actFoodMedium.push(data[i].priority);
                        } else {
                            actFoodLow.push(data[i].priority);
                        };
                    } else if (data[i].Activity.includes('CMAM')){
                        actCMAM.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actCMAMHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                            actCMAMMedium.push(data[i].priority);
                        } else {
                            actCMAMLow.push(data[i].priority);
                        };
                    } else if (data[i].Activity.includes('relief')){
                        actRelief.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actReliefHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                           actReliefMedium.push(data[i].priority);
                        } else {
                            actReliefLow.push(data[i].priority);
                        };
                    } else if (data[i].Activity.includes('School')){
                        actSf.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actSfHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                            actSfMedium.push(data[i].priority);
                        } else {
                            actSfLow.push(data[i].priority);
                        };
                    } else {
                        actStp.push(data[i].Activity);
                        if (data[i].priority.includes('High')){
                            actStpHigh.push(data[i].priority);
                        } else if (data[i].priority.includes('Medium')){
                            actStpHigh.push(data[i].priority);
                        } else {
                            actStpHigh.push(data[i].priority);
                        };
                    }
                    
                }
                    
               $(document).ready(function () {

                    // Build the chart
                    Highcharts.chart('container', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Issue details by Status'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}% ({point.count:})</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            name: 'Status',
                            colorByPoint: true,
                            data: [{
                                name: 'Resolved',
                                y: resolved.length
                            }, {
                                name: 'Closed',
                                y: closed.length,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Open',
                                y: open.length
                            }]
                        }]
                    });
                });
                     /*Highcharts.chart('container2', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Issue details by Activity'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            name: 'Activity',
                            colorByPoint: true,
                            data: [{
                                name: 'FFA Cash',
                                y: actCash.length
                            }, {
                                name: 'FFA Food',
                                y: actFood.length,
                                //sliced: true,
                                //selected: true
                            }, {
                                name: 'Relief',
                                y: actRelief.length
                            }, {
                                name: 'CMAM',
                                y: actCMAM.length
                            }, {
                                name: 'Stuntin Prevention',
                                y: actStp.length
                            }, {
                                name: 'School Feeding',
                                y: actSf.length
                            }]
                        }]
                    });
                */Highcharts.chart('container3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Total Issues Reported By Activity'
                },
                subtitle: {
                    text: 'Click columns to view priority.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Total number of Issues'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{
                    name: 'Activity',
                    colorByPoint: true,
                    data: [{
                        name: 'FFA Cash',
                        y: actCash.length,
                        drilldown: 'FFA Cash'
                    }, {
                        name: 'FFA Food',
                        y: actFood.length,
                        drilldown: 'FFA Food'
                    }, {
                        name: 'Relief',
                        y: actRelief.length,
                        drilldown: 'Relief'
                    }, {
                        name: 'CMAM',
                        y: actCMAM.length,
                        drilldown: 'CMAM'
                    }, {
                        name: 'School Feeding',
                        y: actSf.length,
                        drilldown: 'School Feeding'
                    }, {
                        name: 'Stunting Prevention',
                        y: actStp.length,
                        drilldown: 'Stunting Prevention'
                    }]
                }],
                drilldown: {
                    series: [{
                        name: 'FFA Cash',
                        id: 'FFA Cash',
                        data: [
                            [
                                'High',
                                actCashHigh.length
                            ],
                            [
                                'Medium',
                                actCashMedium.length
                            ],
                            [
                                'Low',
                                actCashLow.length
                            ]
                        ]
                    }, {
                        name: 'FFA Food',
                        id: 'FFA Food',
                        data: [
                            [
                                'High',
                                actFoodHigh.length
                            ],
                            [
                                'Medium',
                                actFoodMedium.length
                            ],
                            [
                                'Low',
                                actFoodLow.length
                            ]
                        ]
                    }, {
                        name: 'CMAM',
                        id: 'CMAM',
                        data: [
                            [
                                'High',
                                actCMAMHigh.length
                            ],
                            [
                                'Medium',
                                actCMAMMedium.length
                            ],
                            [
                                'Low',
                                actCMAMLow.length
                            ]
                        ]
                    }, {
                        name: 'Relief',
                        id: 'Relief',
                        data: [
                            [
                                'High',
                                actReliefHigh.length
                            ],
                            [
                                'Medium',
                                actReliefMedium.length
                            ],
                            [
                                'Low',
                                actReliefLow.length
                            ]
                        ]
                    }, {
                        name: 'School Feeding',
                        id: 'School Feeding',
                        data: [
                            [
                                'High',
                                actSfHigh.length
                            ],
                            [
                                'Medium',
                                actSfMedium.length
                            ],
                            [
                                'Low',
                                actSfLow.length
                            ]
                        ]
                    }, {
                        name: 'Stunting Prevention',
                        id: 'Stunting Prevention',
                        data: [
                            [
                                'High',
                                actStpHigh.length
                            ],
                            [
                                'Medium',
                                actStpMedium.length
                            ],
                            [
                                'Low',
                                actStpLow.length
                            ]
                        ]
                    }]
                }
            });
                
            }
        });
