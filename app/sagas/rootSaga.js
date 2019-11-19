import { fork } from "redux-saga/effects";
import {
  watchAuthorize,
  watchGetToken,
  watchVerify,
} from "./AuthSaga/authSaga";

import {
  watchServerList,
  watchServerDetail,
  watchServerCounting,
  watchAlarmItemList,
  watchFailureAlarmLog,
  watchFailureAlarmLogDetail,
  watchAsRequestList,
  watchAsRequestDetail,
  watchCommentRegistration,
  watchAsRequestTypeList,
  watchGuestNoList,
  watchAsRequestRegistration,
} from "./OthersSaga/othersSaga";

export default function* rootSaga() {
  yield fork(watchAuthorize),
  yield fork(watchGetToken),
  yield fork(watchVerify),
  yield fork(watchServerList),
  yield fork(watchServerDetail),
  yield fork(watchServerCounting),
  yield fork(watchAlarmItemList),
  yield fork(watchFailureAlarmLog),
  yield fork(watchFailureAlarmLogDetail),
  yield fork(watchAsRequestList),
  yield fork(watchAsRequestDetail),
  yield fork(watchCommentRegistration),
  yield fork(watchAsRequestTypeList),
  yield fork(watchGuestNoList),
  yield fork(watchAsRequestRegistration)
}
