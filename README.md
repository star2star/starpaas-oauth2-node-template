# StarPaaS OAuth2 Node Template

## Introduction

The **starpaas-oauth2-node-template** serves as a template for creating oauth2 nodes for StarPaaS

## Usage

Clone this repository

```bash
git clone https://github.com/star2star/starpaas-oauth2-node-template.git
git remote remove origin
```

Install dependencies

```bash
npm install 
```

Using your favorite editor modify the node code which can be found at ./src/index.js.  

You may need to modify the storybook test file which can be found at ./src/test/stories/index.js.  NOTE: changes within this file might need to be applied to template so future nodes may blessed by your changes; please coordinate with team lead. 

Validating via StoryBook

```bash
npm run storybook
```

## History

#### 02/07/2019 - v1.1.1
* isDisabled for all inputs 
* internationalization 
* isPublishedApplication disabling 
* published and unpublished are optional so commented out ... with comment 

#### 02/04/2019 - v1.1.0 
* added needsToken 

#### 01/21/2019 - v1.0.0

* initial checkin 