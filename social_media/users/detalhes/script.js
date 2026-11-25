document.addEventListener("DOMContentLoaded",()=>{
    show_user_details()
})




function show_user_details(){
    const user = JSON.parse(sessionStorage.getItem("user"))

    const nameH2 = document.getElementById("user-name")
    nameH2.textContent = user.name

    const userNameP = document.querySelector('[data-field="username"]')
    userNameP.textContent = "@"+user.username

    const userIdP = document.querySelector('[data-field="id"]')
    userIdP.textContent = "#"+user.id

    const userEmailDD = document.querySelector('[data-field="email"]')
    userEmailDD.textContent = user.email

    const userPhoneDD = document.querySelector('[data-field="phone"]')
    userPhoneDD.textContent = user.phone

    const userWebsiteDD = document.querySelector('[data-field="website"]')
    userWebsiteDD.textContent = user.website

    const userStreetDD = document.querySelector('[data-field="address.street"]')
    userStreetDD.textContent = user.address.street

    const userSuiteDD = document.querySelector('[data-field="address.suite"]')
    userSuiteDD.textContent = user.address.suite

    const userCityDD = document.querySelector('[data-field="address.city"]')
    userCityDD.textContent = user.address.city

    const userCepDD = document.querySelector('[data-field="address.zipcode"]')
    userCepDD.textContent = user.address.zipcode

    const userGeoLatDD = document.querySelector('[data-field="address.geo.lat"]')
    userGeoLatDD.textContent = user.address.geo.lat

    const userGeoLngDD = document.querySelector('[data-field="address.geo.lng"]')
    userGeoLngDD.textContent = user.address.geo.lng

    const userCompanyNameDD = document.querySelector('[data-field="company.name"]')
    userCompanyNameDD.textContent = user.company.name

    const userCompanycatchPhraseDD = document.querySelector('[data-field="company.catchPhrase"]')
    userCompanycatchPhraseDD.textContent = user.company.catchPhrase

    const userCompanyBsDD = document.querySelector('[data-field="company.catchbsPhrase"]')
    userCompanyBsDD.textContent = user.company.bs
}