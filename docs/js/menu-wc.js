'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fast-form-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AnswerModule.html" data-type="entity-link">AnswerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' : 'data-target="#xs-controllers-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' :
                                            'id="xs-controllers-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' }>
                                            <li class="link">
                                                <a href="controllers/AnswerController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnswerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' : 'data-target="#xs-injectables-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' :
                                        'id="xs-injectables-links-module-AnswerModule-9fdb35037f954459c785bbba7b4db36b"' }>
                                        <li class="link">
                                            <a href="injectables/AnswerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AnswerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-aca6af5bd23f7a9a9890aad5d118801e"' : 'data-target="#xs-controllers-links-module-AppModule-aca6af5bd23f7a9a9890aad5d118801e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-aca6af5bd23f7a9a9890aad5d118801e"' :
                                            'id="xs-controllers-links-module-AppModule-aca6af5bd23f7a9a9890aad5d118801e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' : 'data-target="#xs-controllers-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' :
                                            'id="xs-controllers-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' : 'data-target="#xs-injectables-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' :
                                        'id="xs-injectables-links-module-AuthModule-c4f1924ca9611f07f807eed1276d7aa5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuxiliaryModule.html" data-type="entity-link">AuxiliaryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuxiliaryModule-153f2bc28a37fed3bf1140f058fa6798"' : 'data-target="#xs-injectables-links-module-AuxiliaryModule-153f2bc28a37fed3bf1140f058fa6798"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuxiliaryModule-153f2bc28a37fed3bf1140f058fa6798"' :
                                        'id="xs-injectables-links-module-AuxiliaryModule-153f2bc28a37fed3bf1140f058fa6798"' }>
                                        <li class="link">
                                            <a href="injectables/ProfessorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProfessorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StudentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaslModule.html" data-type="entity-link">CaslModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CaslModule-f8fda742ab120bd4836fe55b85adcf14"' : 'data-target="#xs-injectables-links-module-CaslModule-f8fda742ab120bd4836fe55b85adcf14"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-f8fda742ab120bd4836fe55b85adcf14"' :
                                        'id="xs-injectables-links-module-CaslModule-f8fda742ab120bd4836fe55b85adcf14"' }>
                                        <li class="link">
                                            <a href="injectables/CaslAbilityFactory.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CaslAbilityFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-51938da6e8e429bc621cb4e4266c68d0"' : 'data-target="#xs-injectables-links-module-CoreModule-51938da6e8e429bc621cb4e4266c68d0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-51938da6e8e429bc621cb4e4266c68d0"' :
                                        'id="xs-injectables-links-module-CoreModule-51938da6e8e429bc621cb4e4266c68d0"' }>
                                        <li class="link">
                                            <a href="injectables/PayloadInterceptor.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PayloadInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamModule.html" data-type="entity-link">ExamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' : 'data-target="#xs-controllers-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' :
                                            'id="xs-controllers-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' }>
                                            <li class="link">
                                                <a href="controllers/ExamAgreementController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExamAgreementController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ExamController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExamController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ExamTargetController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExamTargetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' : 'data-target="#xs-injectables-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' :
                                        'id="xs-injectables-links-module-ExamModule-c12eb3d37140625b22d8d3fea9b834e7"' }>
                                        <li class="link">
                                            <a href="injectables/ExamAgreementService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExamAgreementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExamService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamTargetService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExamTargetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirebaseAdminModule.html" data-type="entity-link">FirebaseAdminModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FirebaseAdminModule-1db91986c80ab5c72af7df6d1a31b4aa"' : 'data-target="#xs-injectables-links-module-FirebaseAdminModule-1db91986c80ab5c72af7df6d1a31b4aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FirebaseAdminModule-1db91986c80ab5c72af7df6d1a31b4aa"' :
                                        'id="xs-injectables-links-module-FirebaseAdminModule-1db91986c80ab5c72af7df6d1a31b4aa"' }>
                                        <li class="link">
                                            <a href="injectables/FirebaseAdmin.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FirebaseAdmin</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirebaseModule.html" data-type="entity-link">FirebaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FirebaseModule-c77f62ae539c382261c57235716725e6"' : 'data-target="#xs-injectables-links-module-FirebaseModule-c77f62ae539c382261c57235716725e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FirebaseModule-c77f62ae539c382261c57235716725e6"' :
                                        'id="xs-injectables-links-module-FirebaseModule-c77f62ae539c382261c57235716725e6"' }>
                                        <li class="link">
                                            <a href="injectables/FirebaseAuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FirebaseAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FirebaseCloudMessagingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FirebaseCloudMessagingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfraModule.html" data-type="entity-link">InfraModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InfraModule-e4e0f01552c40df09334f1a6a780056c"' : 'data-target="#xs-controllers-links-module-InfraModule-e4e0f01552c40df09334f1a6a780056c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InfraModule-e4e0f01552c40df09334f1a6a780056c"' :
                                            'id="xs-controllers-links-module-InfraModule-e4e0f01552c40df09334f1a6a780056c"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link">LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-1a0714a101ea35f73fe4c1c12f1d35db"' : 'data-target="#xs-injectables-links-module-LoggerModule-1a0714a101ea35f73fe4c1c12f1d35db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-1a0714a101ea35f73fe4c1c12f1d35db"' :
                                        'id="xs-injectables-links-module-LoggerModule-1a0714a101ea35f73fe4c1c12f1d35db"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLogger.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CustomLogger</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionGroupModule.html" data-type="entity-link">QuestionGroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' : 'data-target="#xs-controllers-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' :
                                            'id="xs-controllers-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' }>
                                            <li class="link">
                                                <a href="controllers/QuestionController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/QuestionGroupController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionGroupController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' : 'data-target="#xs-injectables-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' :
                                        'id="xs-injectables-links-module-QuestionGroupModule-7f2d1af6c02ad7a20a079d3258a915ca"' }>
                                        <li class="link">
                                            <a href="injectables/QuestionGroupService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QuestionGroupService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QuestionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QuestionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' : 'data-target="#xs-controllers-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' :
                                            'id="xs-controllers-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' : 'data-target="#xs-injectables-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' :
                                        'id="xs-injectables-links-module-UserModule-cd0c3285e2283c22305f157b83cd0674"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdminUser1620299822480.html" data-type="entity-link">AdminUser1620299822480</a>
                            </li>
                            <li class="link">
                                <a href="classes/Answer.html" data-type="entity-link">Answer</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerGrade.html" data-type="entity-link">AnswerGrade</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerGradeRepository.html" data-type="entity-link">AnswerGradeRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerRepository.html" data-type="entity-link">AnswerRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link">Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth1619445806509.html" data-type="entity-link">Auth1619445806509</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link">AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRepository.html" data-type="entity-link">AuthRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auxiliary1620477175799.html" data-type="entity-link">Auxiliary1620477175799</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyQuestionGroupDto.html" data-type="entity-link">CopyQuestionGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Course.html" data-type="entity-link">Course</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAnswerDto.html" data-type="entity-link">CreateAnswerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link">CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExamAgreementDto.html" data-type="entity-link">CreateExamAgreementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExamDto.html" data-type="entity-link">CreateExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestion.html" data-type="entity-link">CreateQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionDto.html" data-type="entity-link">CreateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionGroupDto.html" data-type="entity-link">CreateQuestionGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionsDto.html" data-type="entity-link">CreateQuestionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Exam.html" data-type="entity-link">Exam</a>
                            </li>
                            <li class="link">
                                <a href="classes/Exam1620478273991.html" data-type="entity-link">Exam1620478273991</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamAgreement.html" data-type="entity-link">ExamAgreement</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamAgreement1622332886234.html" data-type="entity-link">ExamAgreement1622332886234</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamAgreementAnonymousDefault1622334780336.html" data-type="entity-link">ExamAgreementAnonymousDefault1622334780336</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamAgreementRepository.html" data-type="entity-link">ExamAgreementRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamRepository.html" data-type="entity-link">ExamRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamTarget.html" data-type="entity-link">ExamTarget</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamTarget1622326106015.html" data-type="entity-link">ExamTarget1622326106015</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamTargetRepository.html" data-type="entity-link">ExamTargetRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamTitle1621036457247.html" data-type="entity-link">ExamTitle1621036457247</a>
                            </li>
                            <li class="link">
                                <a href="classes/FFEntity.html" data-type="entity-link">FFEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Grade.html" data-type="entity-link">Grade</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link">LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Period.html" data-type="entity-link">Period</a>
                            </li>
                            <li class="link">
                                <a href="classes/Professor.html" data-type="entity-link">Professor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfessorRepository.html" data-type="entity-link">ProfessorRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Question.html" data-type="entity-link">Question</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionFindDto.html" data-type="entity-link">QuestionFindDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionGroup.html" data-type="entity-link">QuestionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionGroup1620179231630.html" data-type="entity-link">QuestionGroup1620179231630</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionGroupRepository.html" data-type="entity-link">QuestionGroupRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionGroupTarget1621992475274.html" data-type="entity-link">QuestionGroupTarget1621992475274</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionImage1620477869366.html" data-type="entity-link">QuestionImage1620477869366</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionPosition1620488935141.html" data-type="entity-link">QuestionPosition1620488935141</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionPositionIdx1620563708532.html" data-type="entity-link">QuestionPositionIdx1620563708532</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionRepository.html" data-type="entity-link">QuestionRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReorderQuestionDto.html" data-type="entity-link">ReorderQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReorderQuestionGroupDto.html" data-type="entity-link">ReorderQuestionGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link">Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/StudentRepository.html" data-type="entity-link">StudentRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subject.html" data-type="entity-link">Subject</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimestampEntity.html" data-type="entity-link">TimestampEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAnswerDto.html" data-type="entity-link">UpdateAnswerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExamDto.html" data-type="entity-link">UpdateExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuestionDto.html" data-type="entity-link">UpdateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuestionGroupDto.html" data-type="entity-link">UpdateQuestionGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploaderService.html" data-type="entity-link">UploaderService</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link">UserRepository</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FirebaseFirestoreService.html" data-type="entity-link">FirebaseFirestoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseStorageService.html" data-type="entity-link">FirebaseStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseUploader.html" data-type="entity-link">FirebaseUploader</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ExamTargetManagerDto.html" data-type="entity-link">ExamTargetManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileSendDto.html" data-type="entity-link">FileSendDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseAsyncModuleOptions.html" data-type="entity-link">FirebaseAsyncModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseAuthDecodedToken.html" data-type="entity-link">FirebaseAuthDecodedToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseModuleOptions.html" data-type="entity-link">FirebaseModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link">JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SoftDeleteResult.html" data-type="entity-link">SoftDeleteResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwaggerOptions.html" data-type="entity-link">SwaggerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResult.html" data-type="entity-link">UserResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});