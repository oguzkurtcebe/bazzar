"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {

        var datatable = $('#kt_datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'http://localhost:8080/rest/categories',
                        //url: HOST_URL + '/api/datatables/demos/default.php',
                        // sample custom headers
                        // headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false,
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#kt_datatable_search_query'),
                key: 'generalSearch'
            },

            // columns definition
            columns: [{
                field: '',
                title: 'Resim',
                sortable: false,
                width: 100,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
					var imageUrl = "";
				
					if(row.imageUrl == "" || row.imageUrl == null){
						if(row.productImages != "" && row.productImages != null){
							imageUrl = row.productImages[0].imageUrl;
						}else{
							imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
						}
					}else{
						imageUrl = row.imageUrl;
					}
					var image=("<tr id='"+row._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+"<img width='75' src='"+imageUrl+"'>"+"</span></td>");
			        
                    return image;
                },
            },{
                field: 'title',
                title: 'Adı',
            },{
                field: 'description',
                title: 'Açıklama',
            },{
                field: 'status',
                title: 'Durum',
                sortable: false,
                width: 100,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
					var statusPrint;
					if(row.status == true){
			        	statusPrint = "checked='checked'"; 
			        }else{
			        	statusPrint = "";
			        }
			        var mobileNumber = "yok";
                    return "<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+row._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>";
                },
            },{
                field: '_id',
                title: 'Seçenekler',
                sortable: false,
                width: 100,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
                    return "<td class='text-center'>"+"<div class='btn btn-icon btn-success btn-hover-dark btn-sm userView' id='"+row._id+"' data-toggle='modal' data-target='.bd-example-modal-lg'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-eye'></div></span></div>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm categoryDelete' id='"+row._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td>";
                },
            }
            ],

        });

		$('#kt_datatable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_datatable_search_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_datatable_search_status, #kt_datatable_search_type').selectpicker();
    };

    return {
        // public functions
        init: function() {
            demo();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableRemoteAjaxDemo.init();
});
