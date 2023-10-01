const url = window.location.href;

if (isIntraForgeUrl()) {
    mainIntraForge();
} else if (isIonisxUrl()) {
    mainIonisx();
} else if (isDebugProUrl()) {
    mainDebugPro();
} else if (isMoodleUrl()) {
    mainMoodle();
} else if (isEpidocsUrl()) {
    mainEpidocs();
}