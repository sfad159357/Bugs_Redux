此為純Redux專案，並沒有太多著墨於React前端設計，使用axios簡單對server GET, POST, PUT Bugs。

# Redux
Redux不只支援React函式庫，也支援Angular, Vue, vanilla javascript各類框架，目的在統一state管理，統一放置的地方為store，像是前端的database，使不同的UI元件能夠同步化，也就是一有元件更新，另一個元件或其他的元件同步更新渲染，元件不在維護自己的狀態，統一去store存取。透過Redux，可以讓我們知道data是如何改變，為何？在何時？從何而來？讓data流向使其可預測性和透明化。

### 優點：
1.state改變透明化  2.集中管理state 3.很好dubug 4.能夠暫存或永存state 5.可以回復上一個動作 6.ecosystem of add-ons
### 缺點：
1.間接且複雜的code 2.需要寫複雜的code而冗長

## Design Paragram設計風格
主要以Functional Programming作為設計導向，其好處在於將功能拆分更小reusable的函式，不管是input或return，都不會更動任何的data，透過安裝immer或immutable套件，來達到pure function。也可以將函式組合成更複雜的函式，其設計風格好處：1.更精確 2.好debug 3.好測試 4.好擴充

### 機制
透過store其函式dispatch，發送actions事件，會先進入到middleware中介體進行actions的紀錄和條件式來判別actions是要到下一個中介體，還是直接去到reducers。actions進入到reducers後，reducers進行對action中的payload做運算然後儲存在store中。最後UI介面透過subscribe訂閱store的狀態，存取store內某state的data而render出頁面，一旦store有任何state的更新，UI介面也會隨之更新。

### 功能
1.loadBugs:從server載入讀取Bugs，並設定間隔10分鐘內，無法再次載入，讀取上次的state。
2.addBug:對server新增bug，參數是對bug的description屬性值。
3.resolveBug:對server進行將指定id參數的bug，改變其屬性resolved為true。
4.assginBugToUser：對server進行將指定id參數的Bug，新增屬性userId，其值為指定userId參數。
5.getResolvedBugs:從store中載入讀取其屬性resolved=false的所有bugs，其回傳型態為陣列。
6.getBugsByUser:輸入指定userId參數，從store中載入取得其bugs屬性userId的值相同的bugs，其回傳型態為陣列。

### 工具
透過store其函式dispatch，發送actions事件，會先進入到middleware中介體進行actions的紀錄和條件式來判別actions是要到下一個中介體，還是直接去到reducers。actions進入到reducers後，reducers進行對action中的payload做運算然後儲存在store中。最後UI介面透過subscribe訂閱store的狀態，存取store內某state的data而render出頁面，一旦store有任何state的更新，UI介面也會隨之更新。
1.使用toolkit函式庫，調用createAction和createSlice模組，而createSlice可以快速設定actions和reducers並整合。另外，可以調用configureStore進行對store進行reducers和中介體middleware的配置。

2.使用reselect函式庫，調用createSelector模組，以state作為參數，若下次傳輸state跟上一次一樣，就不進行運算，直接回傳上次的結果，節省CPU運作資源。

3.使用react-redux函式庫，可以使用connect模組，將state和dispatch納入此元件的props，就可以透過props直接呼叫store中的state和dispatch，render的呈現也直接內建subscribe和unsubscribe。

### 測試
進行Unit Test單元測試，所以不要牽涉到外部網站的存取，透過axios-mock-adapter套件，調用MockAdapter類別，產生fakeAxios物件，透過fakeAxios來進行針對不同HTTP methods進行假設性回傳response status以及response data，來模擬真實的axios。
針對上述功能函式進行單元測試，去expect期望其回傳結果是否和我們假設的是一致，並且也針對如果請求失敗的反向測試。
