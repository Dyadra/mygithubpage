

function setup()
{
    createCanvas(1000,1000);

    var mgr = new SceneManager();
    
    mgr.wire();
    mgr.showScene( Intro );
}