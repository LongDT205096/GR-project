const base = '/account/auth/users/'

const request = {
    fetchRegister: base,
    fetchActivate: base + 'activation/',
    fetchChangePass: base + 'set_password/',
    fetchResetPass: base + 'reset_password/',
    fetchResetPassConfirm: base + 'reset_password_confirm/',
}

export default request;

