@echo off
hulk templates/* > app/views/template.js && echo exports.templates=templates >> app/views/template.js