
$(document).ready(function () {
  // $('#table').DataTable({
  //   language: {
  //     "processing": "處理中...",
  //     "loadingRecords": "載入中...",
  //     "lengthMenu": " 顯示&emsp;_MENU_&emsp;列",
  //     "zeroRecords": "沒有符合的結果",
  //     "infoFiltered": "(從 _MAX_ 項結果中過濾)",
  //     "info": "顯示 &ensp; _START_  - _END_ &ensp; of &ensp; _TOTAL_&ensp;列",
  //     "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
  //     "searchPlaceholder": "搜尋",
  //     "paginate": {
  //       "first": '<span ><<</span>',
  //       "previous": '<span ><</span>',
  //       "next": '<span >></span>',
  //       "last": '<span >>></span>'
  //     },
  //   },
  // });




  let vm = new Vue({
    // el: '#app',
    data: {
      componentName: '',
    },
    methods: {
      aaaa() {
        this.componentName = 'my-component'
      }
    },
    components: {
      'my-component': httpVueLoader('../backEnd/component/Holiday_management-add.vue')
    },
    beforeCreate() {
      $.ajax({
        type: 'POST',
        url: 'http://192.168.50.47:8056/Back/Api/Holiday/SearchList',
        dataType: 'JSON',
        data: JSON.stringify({
          "token": "string",
          "orderMode": "string",
          "orderName": "string",
          "number": "999999",
          "page": "1"
        }),
        contentType: 'application/ json',
        success: function (json) {
          console.log(json.data)
          var datas = json.data;
          $('table').DataTable({
            destroy: true,
            autoWidth: false,
            language: {
              "processing": "處理中...",
              "loadingRecords": "載入中...",
              "lengthMenu": " 顯示&emsp;_MENU_&emsp;列",
              "zeroRecords": "沒有符合的結果",
              "infoFiltered": "(從 _MAX_ 項結果中過濾)",
              "info": "顯示 &ensp; _START_  - _END_ &ensp; of &ensp; _TOTAL_&ensp;列",
              "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
              "searchPlaceholder": "搜尋",
              "paginate": {
                "previous": '<span ><</span>',
                "next": '<span >></span>'
              },
            },
            data: datas,
            columns: [
              // { "data：固定這樣寫": "key","title：th表頭":"th表頭名稱"},
              { "data": "Name" },
              { "data": "Date" },
              { "data": "Name" },
              { "data": "Time" },
              { "defaultContent": "" },

            ],
            "columnDefs": [
              {
                "targets": 2,
                'createdCell': function (td, cellData, rowData, row, col) {
                  let status = ''
                  console.log(rowData)
                  if (rowData.Enable == 1) {
                    status = '啟用'
                  }
                  $(td).html(`
                    <p class="${rowData.Enable == 1 ? '' : 'ban'}">${rowData.Enable == 1 ? '啟用' : '停用'}</p>
                  `);
                }
              },
              {
                "targets": 4,
                'createdCell': function (td, cellData, rowData, row, col) {
                  $(td).html(`
                    <a href="#" class="edit" @click="aaaa">檢視編輯</a>
                    <a href="#" class="delete">刪除</a>
                    <input type="hidden" SerNo="${rowData.SerNo} ">
                  `);
                }
              },
            ],
            responsive: true,
          });
          vm.$mount('#app')
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest.status);
          console.log(XMLHttpRequest.readyState);
          console.log(textStatus);
        },
      });

    },
    mounted() {

    },
  })


});

