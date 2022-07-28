<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Playlist;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $playlist = Playlist::where('user_id',auth()->user()->id)
                            ->where('id',$request->playlist_id)
                            ->firstOrFail();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url'
        ]);

        Video::create([
            'title' => $data['title'],
            'url' => $data['url'],
            'playlist_id' => $playlist->id,
            'user_id' => auth()->user()->id
        ]);

        return response()->json(['success'=>true,'message'=>'video created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $video = Video::where('user_id',auth()->user()->id)
                        ->where('id',$id)
                        ->firstOrFail();

        return response()->json(['video'=>$video]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $playlist = Playlist::where('user_id',auth()->user()->id)
                            ->where('id',$request->playlist_id)
                            ->firstOrFail();

        $video = Video::where('user_id',auth()->user()->id)
                        ->where('playlist_id',$playlist->id)
                        ->where('id',$id)
                        ->firstOrFail();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url'
        ]);

        $video->title = $data['title'];
        $video->url = $data['url'];
        $video->save();

        return response()->json(['success'=>true,'message'=>'video updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $video = Video::where('user_id',auth()->user()->id)
                        ->where('id',$id)
                        ->firstOrFail();
        $video->delete();

        return response()->json(['success'=>true,'message'=>'video deleted successfully']);
    }
}
