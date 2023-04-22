/**
 * error code 정의
 *
 * 1. 앞 3자리 : 에러 종류
 *    - 에러 종류의 묶음
 *
 * 000 : 공통 에러
 * 001 : validation 관련 에러
 * 002 : 계정 관련 에러
 *
 *
 * 2. 뒤 4자리 : 상세 에러 내용
 *    - 1부터 9999까지
 *    - 1씩 증가
 *
 * 예시
 * ERR_   002     _     0003         --> 계정 관련 에러 중 3번째 에러
 *     (계정 관련) (상세 에러 번호)
 */
export interface IErrorCode {
  ERR_000_0001: string;
  ERR_000_0002: string;
  ERR_000_0003: string;
  ERR_000_0004: string;
  ERR_000_0005: string;
  ERR_000_0006: string;
  ERR_000_0007: string;
  ERR_000_0008: string;
  ERR_000_0009: string;
  ERR_000_0010: string;

  // validation error
  ERR_001_0001: string;
  ERR_001_0002: string;

  // user error
  ERR_002_0001: string;
  ERR_002_0002: string;
  ERR_002_0003: string;
  ERR_002_0004: string;
  ERR_002_0005: string;
  ERR_002_0006: string;
  ERR_002_0007: string;
  ERR_002_0008: string;
  ERR_002_0009: string;
  ERR_002_0010: string;
  ERR_002_0011: string;
}
