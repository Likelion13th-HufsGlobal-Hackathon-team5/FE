// src/pages/modals/namemodal.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

// ===== 폰트 & 이미지 =====
import JoyM from "../../fonts/TJJoyofsingingM_TTF.ttf"; // Medium
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import mascot from "../../assets/연필조아용.png";        // 마스코트 이미지

// ===== 전역 폰트 주입 + 스크롤 잠금 =====
const GlobalFonts = createGlobalStyle`
  @font-face { font-family: "TJJoyofsingingM"; src: url(${JoyM}) format("truetype"); font-weight: 500; font-display: swap; }
  @font-face { font-family: "TJJoyofsingingB"; src: url(${JoyB}) format("truetype"); font-weight: 700; font-display: swap; }
`;
const ScrollLock = createGlobalStyle`
  body { overflow: hidden; touch-action: none; }
`;

/* =========================================
 * ① 목데이터(가짜 API) — 개발용
 *    - 실제 연동 시 아래 함수들을 axios 호출로 교체
 * ========================================= */

// (목) 닉네임 중복확인: "test", "admin"은 사용 불가라고 가정
async function checkNicknameMock(name) {
  await new Promise((r) => setTimeout(r, 350)); // 지연 흉내
  const banned = ["test", "admin"];
  const ok = !!name && !banned.includes(name.trim().toLowerCase());
  return { ok, message: ok ? "사용 가능한 닉네임입니다!" : "이미 사용 중입니다!" };
}

// (목) 닉네임 변경: 서버 성공 가정
async function updateNicknameMock(nickname) {
  await new Promise((r) => setTimeout(r, 450)); // 지연 흉내
  if (!nickname?.trim()) return { ok: false, message: "닉네임을 입력해 주세요." };
  return { ok: true };
}

/* =========================================
 * ② 실제 연동 시 교체할 포인트 (참고)
 * -----------------------------------------
 * import { api } from "../../lib/api";
 *
 * async function checkNickname(name) {
 *   const { data } = await api.get("/auth/check-nickname", { params:{ name }});
 *   // 예: { ok:true, data:{ available:true|false } }
 *   return {
 *     ok: data.ok && data.data.available,
 *     message: data.data.available ? "사용 가능한 닉네임입니다!" : "이미 사용 중입니다!"
 *   };
 * }
 *
 * async function updateNickname(nickname) {
 *   const { data } = await api.patch("/user/nickname", { nickname });
 *   // 예: { ok:true }
 *   return { ok: data.ok, message: data.message };
 * }
 * ========================================= */

/**
 * props:
 * - onClose: 모달 닫기 핸들러
 * - onChanged?: (newNickname) => void  // 변경 성공 시 부모에 새 닉네임 전달(선택)
 */
export default function NameModal({ onClose = () => {}, onChanged }) {
  // ---------------------------
  // [연동 준비]
  // nickname : 입력 닉네임
  // isNickAvailable : 중복확인 결과(null | true | false)
  // help : 헬퍼 문구(가이드/에러)
  // loading : 버튼 로딩 상태
  // errorTop : 상단 에러(서버 오류/검증 실패)
  // ---------------------------
  const [nickname, setNickname] = useState("");
  const [isNickAvailable, setIsNickAvailable] = useState(null);
  const [help, setHelp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorTop, setErrorTop] = useState("");

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 입력 바뀌면 중복확인 상태 초기화
  useEffect(() => {
    setIsNickAvailable(null);
    setHelp("");
    setErrorTop("");
  }, [nickname]);

  // ===== 중복확인 (목 API 호출) =====
  const handleCheck = async () => {
    setErrorTop("");
    const v = nickname.trim();
    if (!v) {
      setIsNickAvailable(false);
      setHelp("닉네임을 입력해 주세요.");
      return;
    }
    setLoading(true);
    try {
      // (목) 호출
      const res = await checkNicknameMock(v);

      // (실제) 호출 예:
      // const res = await checkNickname(v);

      setIsNickAvailable(res.ok);
      setHelp(res.message);
    } catch (e) {
      setIsNickAvailable(false);
      setHelp("중복확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ===== 변경하기 (목 API 호출) =====
  const handleConfirm = async () => {
    if (!isNickAvailable) return; // 가드
    setLoading(true);
    setErrorTop("");
    try {
      // (목) 호출
      const res = await updateNicknameMock(nickname);

      // (실제) 호출 예:
      // const res = await updateNickname(nickname);

      if (!res.ok) {
        setErrorTop(res.message || "닉네임 변경에 실패했습니다.");
        return;
      }
      onChanged?.(nickname);
      onClose();
    } catch (e) {
      setErrorTop("닉네임 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => onClose();

  // ===== 포털로 렌더링 (부모 레이아웃 영향 X) =====
  const modal = (
    <>
      <GlobalFonts />
      <ScrollLock />
      <Backdrop onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <Wrap>
            <Card>
              <Inner style={{ ["--form-w"]: "17.25rem" }}>
                <Mascot src={mascot} alt="연필조아용" />

                {/* 상단 에러 표시 */}
                {errorTop && <TopError>{errorTop}</TopError>}

                <FormArea>
                  <IdRow>
                    <IdInput
                      placeholder="닉네임"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      disabled={loading}
                    />
                    <CheckButton type="button" onClick={handleCheck} disabled={loading}>
                      {loading ? "확인중" : <>중복<br />확인</>}
                    </CheckButton>
                  </IdRow>
                  {isNickAvailable !== null && (
                    <Helper $ok={!!isNickAvailable}>
                      {help}
                    </Helper>
                  )}
                </FormArea>

                <Buttons>
                  <Button data-variant="cancel" onClick={handleCancel} disabled={loading}>
                    취소
                  </Button>
                  <Button
                    data-variant="confirm"
                    onClick={handleConfirm}
                    disabled={!isNickAvailable || loading}
                    title={!isNickAvailable ? "중복확인을 먼저 완료해 주세요" : "닉네임 변경"}
                  >
                    {loading ? "변경중..." : "변경하기"}
                  </Button>
                </Buttons>
              </Inner>
            </Card>
          </Wrap>
        </div>
      </Backdrop>
    </>
  );

  return ReactDOM.createPortal(modal, document.body);
}

/* ===== 화면 전체 덮는 배경 (중앙정렬) ===== */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/* ===== 아래부터는 “기존 그대로 + 소폭 개선” ===== */
const Wrap = styled.div`
  width: 18.75rem;
  margin: 0 auto;               /* 위 여백 제거 */
  overflow: visible;
  transform: translateY(-5%);   /* 다른 모달과 동일 보정 */
`;

const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
  width: 18.75rem; /* 300px */
`;

const Inner = styled.div`
  --form-w: 17.25rem;
  --gap: 0.3125rem;
  --btn-w: 3.125rem;
  --btn-h: 3rem;
  --input-h: 3rem;
  --pad-x: 1rem;

  width: 18.75rem;
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem;
  height: auto;
`;

const TopError = styled.p`
  width: var(--form-w);
  margin: 0.25rem 0 0;
  color: #ff5656;
  font-size: 0.9375rem;
  font-family: "TJJoyofsingingM", sans-serif;
  text-align: left;
`;

const FormArea = styled.div`
  width: var(--form-w);
  margin-top: 0.25rem;
`;

const IdRow = styled.div`
  width: var(--form-w);
  display: flex;
  align-items: center;
  gap: var(--gap);
`;

const BaseInput = styled.input`
  height: var(--input-h);
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;
  &::placeholder { font-family: "TJJoyofsingingM", sans-serif; }
`;

const IdInput = styled(BaseInput)`
  width: calc(var(--form-w) - var(--btn-w) - var(--gap));
`;

const CheckButton = styled.button`
  width: var(--btn-w);
  height: var(--btn-h);
  background-color: #32885D;
  color: #fff;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  text-align: center;
  font-family: "TJJoyofsingingB", sans-serif;
  cursor: pointer;
  &:disabled { opacity: 0.7; cursor: default; }
`;

const Helper = styled.p`
  margin: 0;
  padding-top: 0.625rem;
  font-size: 1rem;
  text-align: left;
  font-family: "TJJoyofsingingM", sans-serif;
  color: ${({ $ok }) => ($ok ? "#00CA98" : "#FF5656")};
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  cursor: pointer;

  &[data-variant="cancel"] { background: #e8e8e8; color: #32885d; }
  &[data-variant="confirm"] { background: #32885d; color: #fff; }
  &:disabled { background: #ccc; color: #666; cursor: not-allowed; }
`;
