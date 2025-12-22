describe('Prueba E2E MasKotas - Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100');
        cy.wait(1000);
    });

    it('Deberia cargar Login', () => {
        cy.contains('Login').should('be.visible');
        cy.contains('Crear Cuenta').should('exist');
    });

    it('Deberia crear una Cuenta', () => {
        cy.contains('Crear Cuenta').click();
        cy.wait(1000);
        cy.contains('Ingrese Rut').parent().find('ion-input').find('input').type('123456-7', {force: true});
        cy.contains('Nombre').parent().find('ion-input').find('input').type('Juanito', {force: true});
        cy.contains('Direccion').parent().find('ion-input').find('input').type('Ramon Perez 123', {force: true});
        cy.contains('Telefono').parent().find('ion-input').find('input').type('33344222', {force: true});
        cy.contains('Ingrese Contraseña').parent().find('ion-input').find('input').type('TestPass', {force: true});
        cy.contains('Registrar').click();
    });
    
    it('Deberia Iniciar Sesion', () => {
        cy.contains('Rut').parent().find('ion-input').find('input').type('123456-7', {force: true});
        cy.contains('Contraseña').parent().find('ion-input').find('input').type('TestPass', {force: true});
        cy.contains('Ingresar').click();
    });

    it('Deberia Registrar una mascota', () => {
        cy.contains('Rut').parent().find('ion-input').find('input').type('123456-7', {force: true});
        cy.contains('Contraseña').parent().find('ion-input').find('input').type('TestPass', {force: true});
        cy.contains('Ingresar').click();
        cy.contains('Registrar').click();

        cy.contains('Nombre').parent().find('ion-input').find('input').type('Fido', {force: true});
        cy.contains('Especie').parent().find('ion-input').find('input').type('Perro', {force: true});
        cy.contains('Edad').parent().find('ion-input').find('input').type('8', {force: true});
        cy.contains('Finalizar').click();
        cy.contains('Volver').click();
    });
});