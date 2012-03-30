# water

Live coding sketchpad for <a href="http://mbostock.github.com/d3/">d3.js</a> –
data-driven documents.
Code modifications are instantly displayed - no need to refresh your browser.

Based on Gabriel Florit's <a href='https://github.com/gabrielflorit/water'>Water</a>
live coding sketchpad (**<a href='http://gabrielflor.it/water'>original water</a>**)

The beautiful code editor, <a href='http://ace.ajax.org/'>Ace</a>, is an open source project by Ajax.org.

### Setup

Any static file web server will work, for example *Serve* for NodeJS:

    serve

Then hit

    http://localhost:3000/water.html

or try

    http://localhost:3000/water.html#rect-00

and start coding!

Install *Serve* with [NPM](http://npmjs.org/):

    npm install -g serve

### Git Tips

* [How to „Merge” Specific Files from Another Branch](http://jasonrudolph.com/blog/2009/02/25/git-tip-how-to-merge-specific-files-from-another-branch/)

Merging changes from the master branch:

    git checkout vibrant-ink
    git checkout master README.md
    git status
    git diff --cached
    // git add README.md, git add --interactive

## Heroku

Aplikację wdrożyłem na Heroku.

Przykładowo, przykład *examples/circle-05.js* wpisujemy tak:

    http://deep-water.herokuapp.com/#circle-05

Plik *.git/config*:

    [core]
            repositoryformatversion = 0
            filemode = true
            bare = false
            logallrefupdates = true
    [remote "origin"]
            fetch = +refs/heads/*:refs/remotes/origin/*
            url = git@github.com:wbzyl/water.git
    [branch "master"]
            remote = origin
            merge = refs/heads/master
    [remote "heroku"]
            url = git@heroku.com:deep-water.git
            fetch = +refs/heads/*:refs/remotes/heroku/*

Nowe przykłady wrzucamy na heroku w taki sposób:

    git push heroku master
